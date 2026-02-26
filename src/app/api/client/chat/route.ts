
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Fallback: Read from file system if env var is missing (Development specific hack)
if (!OPENROUTER_API_KEY) {
    try {
        // Try to read from project root or parent root
        const possiblePaths = [
            path.join(process.cwd(), '.env.local'),
            path.join(process.cwd(), '../..', '.env.local'),
            path.join(process.cwd(), '.env'),
        ];

        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                const content = fs.readFileSync(p, 'utf-8');
                const match = content.match(/OPENROUTER_API_KEY=(sk-or-v1-[a-zA-Z0-9]+)/);
                if (match && match[1]) {
                    OPENROUTER_API_KEY = match[1];
                    console.log(`[API] Loaded API Key from file: ${p}`);
                    break;
                }
            }
        }
    } catch (err) {
        console.error("[API] Failed to read fallback env file:", err);
    }
}

export async function POST(req: Request) {
    if (!OPENROUTER_API_KEY) {
        console.error("Missing OPENROUTER_API_KEY in env and filesystem fallback.");
        return NextResponse.json({ error: 'OpenRouter API Key not configured' }, { status: 500 });
    }

    try {
        const { messages } = await req.json();

        // List of free models to try in order of preference/reliability
        // We use multiple fallbacks to ensure high availability
        const MODELS_TO_TRY = [
            "openchat/openchat-7b:free",

        ];

        for (const model of MODELS_TO_TRY) {
            try {
                console.log(`[API] Trying model: ${model}`);

                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                        "HTTP-Referer": SITE_URL,
                        "X-Title": "TravelPlanner AI",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": model,
                        "messages": [
                            {
                                "role": "system",
                                "content": "You are a helpful and knowledgeable travel assistant for a travel agency website. Your goal is to help users plan trips, suggest destinations, finding flights/hotels, and act as a concierge. Be concise, friendly, and enthusiastic about travel. Use formatting like bolding for key places."
                            },
                            ...messages
                        ]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const reply = data.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";
                    console.log(`[API] Success with model: ${model}`);
                    return NextResponse.json({ result: reply });
                }

                // If not ok, log and continue to next model
                const errorText = await response.text();
                // If 429 (Rate Limit), strictly continue. If 404, strictly continue.
                console.warn(`[API] Failed with model ${model}: ${response.status}`, errorText);

            } catch (err) {
                console.error(`[API] Network error with model ${model}:`, err);
            }
        }

        // If we get here, all models failed
        return NextResponse.json({ error: 'All AI models failed to respond. Please check API key or try again later.', hint: 'OpenRouter free tier might be busy.' }, { status: 503 });

    } catch (error) {
        console.error("Chat API Internal Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
