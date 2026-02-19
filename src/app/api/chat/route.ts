import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { type SchemaType } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are Solar Genius, an expert solar engineer and AI advisor for Enewable, a solar company in Johannesburg, South Africa. 

Current date and time: {CURRENT_TIME}

Key facts about Enewable:
- Based in Johannesburg, Gauteng
- Specialize in hybrid inverters, lithium-ion batteries, and solar panel installations
- Team includes: Rob Bagley (CEO/Lead Engineer, 35 years experience, Mechanical Engineering Diploma from Wits), Johnathan Bagley (CTO), Michael van Zyl (Sales Director), Leo (Solar Advisor)
- They handle CoCT (City of Cape Town) and Eskom registration
- Typical installation takes 1-2 days, full process takes 2-3 weeks
- Registered with ECSA (Engineering Council of South Africa)

Pricing (ZAR, as of early 2026 - use as estimate, always recommend getting a quote):
- 3kW system: R45,000 - R65,000
- 5kW system: R65,000 - R95,000
- 8kW system: R95,000 - R140,000
- 10kW system: R120,000 - R170,000
- 15kW system: R170,000 - R250,000
- Battery (5kWh): R45,000 - R65,000
- Battery (10kWh): R80,000 - R120,000
- Battery (15kWh): R120,000 - R180,000

Note: Prices vary based on components, roof complexity, and installation details. Always recommend getting a personalized quote.

Technical Expertise - You can explain in detail:
- Solar panel types: Monocrystalline, Polycrystalline, Thin-film - efficiency,
- Inverter types: String inverters, Microinverters, Hybrid inverters - how they work
- Battery chemistry: LiFePO4, Lithium-ion, Lead-acid - cycle life, depth of discharge
- Grid-tied vs Off-grid vs Hybrid systems
- Roof orientation, tilt angles, shading analysis
- Wire sizing, cable losses, voltage drop calculations
- Eskom registration processes, NERSA regulations
- Load calculation, demand management
- Return on investment calculations, payback periods
- CO2 emission savings

Inverter sizing guidelines:
- Small home (R1,500-2,500 bill): 3-5kW inverter
- Medium home (R2,500-5,000 bill): 5-8kW inverter  
- Large home (R5,000-8,000 bill): 8-12kW inverter
- Large estate (R8,000+ bill): 12-20kW inverter

Your role:
- Be a helpful solar consultant - engage users in conversation about going solar
- Use the get_current_time function when users ask about time, dates, or "today"
- Use the get_pricing function when users ask about costs, prices, or estimates
- Use the calculate_savings function when users want savings estimates
- Use the get_battery_runtime function when users ask about backup time
- Use the get_install_timeline function when users ask about installation time
- Always ask follow-up questions to understand their needs better
- Be conversational and engaging - this is a chat, not a quiz
- Use technical terms but explain them clearly
- Help visitors understand solar benefits for Johannesburg homes
- When asked to calculate something, use the appropriate function
- Provide technical details about components, wiring, regulations
- Be friendly, helpful, and informative - make them want to go solar!
- Always recommend requesting a quote for personalized advice
- Use emojis appropriately to make it engaging
- NEVER say you can't do something - offer alternatives or use functions
- NEVER make up information - use the functions available to get accurate data`;

// Tool definitions for Gemini
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOLS: any[] = [
    {
        name: "get_current_time",
        description: "Get the current date and time. Use when users ask about time, dates, or 'today'.",
        parameters: {
            type: "object" as SchemaType,
            properties: {},
            required: [],
        },
    },
    {
        name: "get_pricing",
        description: "Get pricing information for solar systems and components. Use when users ask about costs, prices, or estimates.",
        parameters: {
            type: "object" as SchemaType,
            properties: {
                system_size: {
                    type: "string" as SchemaType,
                    description: "The system size in kW (e.g., '5kW', '10kW'). If unknown, ask the user.",
                    enum: ["3kW", "5kW", "8kW", "10kW", "15kW", "20kW", "unknown"],
                },
                include_battery: {
                    type: "string" as SchemaType,
                    description: "Whether to include battery pricing",
                    enum: ["yes", "no", "unknown"],
                },
            },
            required: [],
        },
    },
    {
        name: "calculate_savings",
        description: "Calculate estimated monthly and yearly savings based on electricity bill.",
        parameters: {
            type: "object" as SchemaType,
            properties: {
                monthly_bill: {
                    type: "number" as SchemaType,
                    description: "Monthly electricity bill in ZAR",
                },
                system_size: {
                    type: "string" as SchemaType,
                    description: "System size in kW (optional, will estimate if not provided)",
                },
            },
            required: ["monthly_bill"],
        },
    },
    {
        name: "get_battery_runtime",
        description: "Calculate how long a battery will last based on load.",
        parameters: {
            type: "object" as SchemaType,
            properties: {
                battery_size: {
                    type: "number" as SchemaType,
                    description: "Battery size in kWh",
                },
                load_watts: {
                    type: "number" as SchemaType,
                    description: "Total load in watts (e.g., 2000W for typical appliances)",
                },
            },
            required: ["battery_size", "load_watts"],
        },
    },
];

// Tool implementations
function getCurrentTime() {
    const now = new Date();
    return {
        date: now.toLocaleDateString("en-ZA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        time: now.toLocaleTimeString("en-ZA", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
}

function getPricing(systemSize: string, includeBattery: string) {
    const pricing: Record<string, { system: string; battery5kWh: string; battery10kWh: string }> = {
        "3kW": { system: "R45,000 - R65,000", battery5kWh: "R90,000 - R130,000", battery10kWh: "R125,000 - R185,000" },
        "5kW": { system: "R65,000 - R95,000", battery5kWh: "R110,000 - R160,000", battery10kWh: "R145,000 - R215,000" },
        "8kW": { system: "R95,000 - R140,000", battery5kWh: "R140,000 - R205,000", battery10kWh: "R175,000 - R260,000" },
        "10kW": { system: "R120,000 - R170,000", battery5kWh: "R165,000 - R235,000", battery10kWh: "R200,000 - R290,000" },
        "15kW": { system: "R170,000 - R250,000", battery5kWh: "R215,000 - R315,000", battery10kWh: "R250,000 - R370,000" },
        "20kW": { system: "R220,000 - R320,000", battery5kWh: "R265,000 - R385,000", battery10kWh: "R300,000 - R440,000" },
    };

    if (systemSize === "unknown") {
        return {
            message: "I'd love to help with pricing! Could you tell me roughly what your monthly electricity bill is? That helps me recommend a system size.",
            pricing: null,
        };
    }

    const info = pricing[systemSize];
    if (!info) {
        return { message: "I don't have pricing for that system size yet. What does your monthly electricity bill look like?", pricing: null };
    }

    let response = `Here's an estimate for a ${systemSize} system:\n\n💰 System Only: ${info.system}`;
    if (includeBattery === "yes" || includeBattery === "unknown") {
        response += `\n🔋 With 5kWh Battery: ${info.battery5kWh}`;
        response += `\n🔋 With 10kWh Battery: ${info.battery10kWh}`;
    }
    response += "\n\n⚠️ These are estimates - get a quote for accurate pricing!";

    return { message: response, pricing: info };
}

function calculateSavings(monthlyBill: number, systemSize?: string) {
    // Estimate: solar offsets 70-85% of bill
    const offsetPercent = 0.75;
    const monthlySavings = monthlyBill * offsetPercent;
    const yearlySavings = monthlySavings * 12;

    // Eskom tariff increase ~12% per year
    const year2 = yearlySavings * 1.12;
    const year3 = year2 * 1.12;
    const year5 = yearlySavings * 1.12 * 1.12 * 1.12 * 1.12 * 1.12;

    let recommendedSize = "5kW";
    if (monthlyBill < 2500) recommendedSize = "3kW";
    else if (monthlyBill < 5000) recommendedSize = "5kW";
    else if (monthlyBill < 8000) recommendedSize = "8kW";
    else if (monthlyBill < 12000) recommendedSize = "10kW";
    else recommendedSize = "15kW";

    return {
        monthly_savings: monthlySavings,
        yearly_savings: yearlySavings,
        savings_5_years: yearlySavings + year2 + year3 + year5,
        recommended_size: systemSize || recommendedSize,
        note: "Estimates based on 75% bill offset. Actual savings depend on usage patterns.",
    };
}

function getBatteryRuntime(batterySize: number, loadWatts: number) {
    // Assume 90% usable capacity, 90% inverter efficiency
    const usableCapacity = batterySize * 0.9;
    const hours = usableCapacity / (loadWatts / 1000);
    const hoursRounded = Math.round(hours * 10) / 10;

    return {
        battery_kwh: batterySize,
        load_watts: loadWatts,
        runtime_hours: hoursRounded,
        runtime_formatted: hoursRounded < 1 
            ? `${Math.round(hoursRounded * 60)} minutes` 
            : `${hoursRounded} hours`,
    };
}

export async function POST(request: Request) {
    try {
        const { message, history } = await request.json();

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        
        // Use gemini-2.0-flash which supports tools
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            tools: [{ functionDeclarations: TOOLS }]
        });

        // Build conversation context
        const conversationHistory = (history || [])
            .map((msg: { role: string; text: string }) =>
                `${msg.role === "user" ? "User" : "Solar Genius"}: ${msg.text}`
            )
            .join("\n");

        // Add current time to prompt
        const now = getCurrentTime();
        const promptWithTime = SYSTEM_PROMPT.replace("{CURRENT_TIME}", `${now.date} at ${now.time}`);

        const fullPrompt = `${promptWithTime}\n\nConversation:\n${conversationHistory}\nUser: ${message}\n\nSolar Genius:`;

        // Generate content with tool calling
        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        
        // Check if model wants to call a function
        const functionCalls = response.functionCalls?.();
        const functionCall = functionCalls?.[0];

        if (functionCall) {
            const { name, args } = functionCall;
            const functionArgs = args as any;
            let functionResult: any;

            switch (name) {
                case "get_current_time":
                    functionResult = getCurrentTime();
                    break;
                case "get_pricing":
                    functionResult = getPricing(functionArgs.system_size || "unknown", functionArgs.include_battery || "unknown");
                    break;
                case "calculate_savings":
                    functionResult = calculateSavings(functionArgs.monthly_bill, functionArgs.system_size);
                    break;
                case "get_battery_runtime":
                    functionResult = getBatteryRuntime(functionArgs.battery_size, functionArgs.load_watts);
                    break;
            }

            // Send function result back to model for final response
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const toolMessage: any = {
                role: "user",
                parts: [{
                    functionResponse: {
                        name: name,
                        response: functionResult
                    }
                }]
            };

            const finalResult = await model.generateContent([fullPrompt, toolMessage]);
            const finalResponse = finalResult.response.text();

            return NextResponse.json({ response: finalResponse });
        }

        const textResponse = response.text();
        return NextResponse.json({ response: textResponse });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "I'm having trouble thinking right now. Give me a moment and try again!" },
            { status: 500 }
        );
    }
}
