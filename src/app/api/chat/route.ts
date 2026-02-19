import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Solar Genius, an AI solar advisor for Enewable, a solar company in Johannesburg, South Africa. 

Key facts about Enewable:
- Based in Johannesburg, Gauteng
- Specialize in hybrid inverters, lithium-ion batteries, and solar panel installations
- Team includes: Rob Bagley (CEO/Lead Engineer, 35 years experience, Mechanical Engineering Diploma from Wits), Johnathan Bagley (CTO), Michael van Zyl (Sales Director), Leo (Solar Advisor)
- They handle CoCT (City of Cape Town) and Eskom registration
- Typical installation takes 1-2 days, full process takes 2-3 weeks

Your role:
- Help visitors understand solar benefits for Johannesburg homes
- Answer questions about savings, load shedding protection, system sizing
- Be friendly, helpful, and informative
- Always recommend requesting a quote for personalized advice
- Keep responses concise but thorough
- Use emojis appropriately to make it engaging
- Never make up information you don't know`;

export async function POST(request: Request) {
    try {
        const { message, history } = await request.json();

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Build conversation context
        const conversationHistory = (history || [])
            .map((msg: { role: string; text: string }) =>
                `${msg.role === "user" ? "User" : "Solar Genius"}: ${msg.text}`
            )
            .join("\n");

        const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation:\n${conversationHistory}\nUser: ${message}\n\nSolar Genius:`;

        const result = await model.generateContent(fullPrompt);
        const response = result.response.text();

        return NextResponse.json({ response });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Failed to get response" },
            { status: 500 }
        );
    }
}
