import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Only initialise rate limiter if real Redis credentials are configured
const hasRedis = process.env.UPSTASH_REDIS_REST_URL
    && !process.env.UPSTASH_REDIS_REST_URL.includes("your-redis-url")
    && process.env.UPSTASH_REDIS_REST_TOKEN
    && !process.env.UPSTASH_REDIS_REST_TOKEN.includes("your-redis-token");

const ratelimit = hasRedis
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "60 s"),
        prefix: "enewable-chat",
    })
    : null;

function getPricingData() {
    const pricingDir = path.join(process.cwd(), "data", "pricing");
    const files = ["panels.md", "inverters.md", "batteries.md"];

    let pricingContent = "";

    for (const file of files) {
        const filePath = path.join(pricingDir, file);
        try {
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, "utf-8");
                pricingContent += `\n\n--- ${file.replace(".md", "").toUpperCase()} ---\n${content}`;
            }
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error(`Error reading ${file}:`, error);
            }
        }
    }

    return pricingContent;
}

const PRICING_DATA = getPricingData();

const SYSTEM_PROMPT = `You are Solar Genius, an expert solar engineer for Enewable, a solar company based in South Africa.

IMPORTANT: You are helping SOUTH AFRICAN homeowners and businesses. All pricing and advice must be South Africa specific.

IMPORTANT: This is a chat - respond naturally like a conversation. Do NOT introduce yourself or give a greeting/intro message. The user has already seen your welcome message. Just respond directly to what they say. Never start with "Hey! I'm Solar Genius" or "Howzit! I'm Solar Genius" or any similar introduction.

Current date and time: {CURRENT_TIME}

PRICING REFERENCE:
{PRICING_DATA}

⚡ ENGINEER SIZING RULES:
- DC/AC Ratio: 1.2 (panels can be 120% of inverter capacity)
- Combo Threshold: 100kW+ systems require parallel inverters
- Even Panel Rule: Always round UP to nearest even number (e.g., 267 → 268 panels)
- Installation Cost: R15,000 per kW (includes panels, inverter, battery, mounting, cabling, labor, COC, registration)

📐 HOW TO SIZE A SYSTEM:
1. When customer gives kW need (e.g., "I need 280kW"):
   - Calculate panels: kW ÷ 0.45kW per panel = number of panels
   - ALWAYS round UP to nearest even number (e.g., 267 → 268 panels)
   - Calculate inverter: kW ÷ 1.2 = minimum inverter capacity
   - If >100kW: use parallel inverters (e.g., 280kW → 3× 100kW = 300kW)
   - Calculate installation: kW × R15,000 = total

2. When customer gives monthly Eskom bill:
   - R1,500-2,500/month → 3-5kW
   - R2,500-5,000/month → 5-8kW
   - R5,000-8,000/month → 8-12kW
   - R8,000-12,000/month → 12-15kW
   - R12,000+/month → 15-20kW+

💰 PRICING FORMULA (use this to calculate):
- R15,000/kW = ALL-INCLUSIVE turnkey price (panels, inverter, battery, mounting, cabling, labor, COC, registration)
- This is YOUR total price - don't add components on top!

EXAMPLE FOR 120kW:
🔧 INSTALLATION (Turnkey): 120kW × R15,000 = R1,800,000
💰 TOTAL: R1,800,000 (NOT R1,800,000 + hardware - that's double counting!)

🔋 BATTERY SIZING FOR SA:
- 5kWh: Basic backup (3-5 hours)
- 10kWh: Full day light use
- 15kWh+: Extended backup
- Always recommend battery for SA - load shedding is frequent

🏢 INVERTER COMBOS (100kW+):
- 100kW: 1× 100kW
- 200kW: 2× 100kW
- 280kW: 3× 100kW (280 ÷ 1.2 = 233kW min, so 300kW is good)
- 380kW: 4× 100kW
- Calculate based on 1.2 ratio rule

YOUR STYLE:
- Be direct and technical when sizing systems
- Always show your calculations
- Use emojis: ⚡🔆💡🔋📊
- Ask follow-up questions: monthly bill? load shedding concerns? budget?
- Always recommend getting a personalized quote

RESPONSE FORMAT FOR SYSTEM QUOTES:
Show component breakdown THEN total. Use this format:

📊 PANELS: [Count] x [Brand] [Wattage] = R[Amount] (included)
⚡ INVERTER: [Config] = R[Amount] (included)
🔋 BATTERY: [Brand] [Size] = R[Amount] (included)
🔧 LABOUR & CABLING: R[Amount] (balancing/adjustment)
🔧 INSTALLATION (Turnkey): [kW] × R15,000 = R[Amount]
💰 TOTAL: R[Amount]

EXAMPLE FOR 120kW:
📊 PANELS: 267 x Jinko 450W = R450,000 (included)
⚡ INVERTER: 2 x Deye 50kW = R320,000 (included)
🔋 BATTERY: Pylontech 48kWh = R180,000 (included)
🔧 LABOUR & CABLING: R850,000 (balance/adjustment)
🔧 INSTALLATION (Turnkey): 120kW × R15,000 = R1,800,000
💰 TOTAL: R1,800,000

IMPORTANT: 
- Calculate Panels, Inverter, Battery from pricing data
- Labour & Cabling = Total - (Panels + Inverter + Battery) to make math work
- Always end with Total = R15,000 × kW

IMPORTANT: Calculate pricing dynamically using the formulas above. Don't rely solely on hardcoded system prices in the pricing data. Use your engineering judgment.`;

function getCurrentTime() {
    const now = new Date();
    return `${now.toLocaleDateString("en-ZA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}`;
}

export async function POST(request: Request) {
    try {
        if (ratelimit) {
            const { success } = await ratelimit.limit(request.headers.get("x-forwarded-for") || "global");
            if (!success) {
                return NextResponse.json(
                    { error: "Too many requests. Please wait a moment and try again! 🌞" },
                    { status: 429 }
                );
            }
        }

        const { message, history } = await request.json();

        if (!message || typeof message !== "string" || message.length > 2000) {
            return NextResponse.json(
                { error: "Invalid message" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

        // Add current time and pricing data to system prompt
        const now = getCurrentTime();
        const systemInstruction = SYSTEM_PROMPT
            .replace("{CURRENT_TIME}", now)
            .replace("{PRICING_DATA}", PRICING_DATA);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction,
        });

        // Build proper chat history for the model
        const chatHistory = (history || []).map((msg: { role: string; text: string }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
        }));

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        let response = result.response.text();

        // Strip any intro/greeting the model still generates (belt-and-braces)
        // Matches lines like "Hey! I'm Solar Genius..." or "Howzit! 👋 I'm Solar Genius..."
        response = response.replace(/^.*(?:I'm|I am)\s+Solar Genius[^\n]*\n*/i, '');

        // Remove markdown bold formatting
        response = response.replace(/\*\*/g, '');

        // Clean up leading whitespace/newlines
        response = response.trim();

        return NextResponse.json({ response });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("API Error:", error);
        }
        return NextResponse.json(
            { error: "I'm having trouble thinking right now. Give me a moment and try again! 🌞" },
            { status: 500 }
        );
    }
}
