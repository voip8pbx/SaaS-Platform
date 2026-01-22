import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'https://holatravelers.com', // Optional, using a placeholder
        'X-Title': 'SuperAdmin Site Generator', // Optional
    },
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const systemPrompt = `
      You are an expert web designer and branding specialist. 
      Your task is to generate a configuration for a travel website based on a user's request.
      
      You must return a strictly valid JSON object with the following fields:
      - name: A creative catchy name for the website (string).
      - description: A compelling, professional 1-2 sentence description (string).
      - primaryColor: A hex color code that matches the vibe (string, e.g., "#ff0000").
      - theme: Must be either "light" or "dark" (string).
      - layout: Must be one of "classic", "modern", "minimal", "showcase" (string). Use "showcase" for visual-heavy themes like nature, space, or movies.
      - heroImage: A high-quality, real unsplash.com image URL that matches the theme (string). Example: "https://images.unsplash.com/photo-1234..."
      
      Do not include markdown formatting (like \`\`\`json). Just return the raw JSON string.
    `;

        const completion = await openai.chat.completions.create({
            model: 'openai/gpt-3.5-turbo', // Using a fast, reliable model via OpenRouter
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Generate a website configuration for: ${prompt}` }
            ],
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error('No content received from AI');
        }

        // Clean up if AI adds markdown code blocks
        const cleanContent = content.replace(/^```json/, '').replace(/```$/, '').trim();

        let config;
        try {
            config = JSON.parse(cleanContent);
        } catch (e) {
            console.error("Failed to parse AI response:", content);
            return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
        }

        return NextResponse.json(config);

    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
