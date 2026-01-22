import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the template's siteConfig
const targetPath = 'D:\\NEXT.js\\Travelpannerwebsite\\src\\config\\siteConfig.ts';

/**
 * Helper to safely extract the JS object from string using Function
 * Note: This is risky if input is not trusted, but this is a local admin tool.
 * A safer way is robust parsing, but for this prototype, regex replacement is preferred.
 */

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { feature, colors, primaryColor } = body;
        // feature: 'flights' | 'packages' | 'global'
        // colors: { header: string, background: string }

        // Read existing file
        if (!fs.existsSync(targetPath)) {
            return NextResponse.json({ success: false, error: 'Target config file not found' }, { status: 404 });
        }

        let content = fs.readFileSync(targetPath, 'utf8');

        // 1. Update Primary Color if present
        if (primaryColor) {
            content = content.replace(/primaryColor:\s*["'].*?["']/, `primaryColor: "${primaryColor}"`);
        }

        // 2. Update Custom Colors intelligently
        if (feature && colors) {
            // We need to parse the existing customColors block to merging
            // Let's try to extract the inner content of customColors
            const match = content.match(/customColors:\s*\{([\s\S]*?)\n\s*\}/);

            if (match) {
                const currentBlockContent = match[1];

                // We will reconstruct the whole customColors object because standard JSON.parse won't work on JS file content easily
                // Strategy: 
                // We know the structure we want:
                // customColors: {
                //    background: "...",
                //    header: "...",
                //    flights: { ... },
                //    packages: { ... }
                // }

                // Regex finding current values
                const findValue = (key: string, text: string) => {
                    // key: "val" or key: { ... }
                    // Simple regex for string values: key:\s*"([^"]*)"
                    const regex = new RegExp(`${key}:\\s*"([^"]*)"`);
                    const m = text.match(regex);
                    return m ? m[1] : "";
                };

                // Get globals
                let globalBg = findValue('background', currentBlockContent);
                let globalHeader = findValue('header', currentBlockContent);

                // If we are updating globals
                if (feature === 'global') {
                    globalBg = colors.background || globalBg;
                    globalHeader = colors.header || globalHeader;
                }

                // Function to get or create feature block
                const getFeatureBlock = (featName: string, text: string) => {
                    const regex = new RegExp(`${featName}:\\s*\\{([\\s\\S]*?)\\}`);
                    const m = text.match(regex);
                    let featBg = "";
                    let featHeader = "";
                    if (m) {
                        featBg = findValue('background', m[1]);
                        featHeader = findValue('header', m[1]);
                    }
                    return { background: featBg, header: featHeader };
                };

                const flights = getFeatureBlock('flights', currentBlockContent);
                const packages = getFeatureBlock('packages', currentBlockContent);

                // Update specific feature
                if (feature === 'flights') {
                    flights.background = colors.background;
                    flights.header = colors.header;
                } else if (feature === 'packages') {
                    packages.background = colors.background;
                    packages.header = colors.header;
                }

                // Construct new block
                const newCustomColors = `customColors: {
        background: "${globalBg}",
        header: "${globalHeader}",
        flights: { header: "${flights.header}", background: "${flights.background}" },
        packages: { header: "${packages.header}", background: "${packages.background}" }
    }`;
                // Replace in content
                // Safer regex: Match from customColors start until the comma before 'theme:' property
                // This assumes standard formatting where customColors is followed by theme
                content = content.replace(/customColors:\s*\{[\s\S]*?\},(?=\s*theme:)/, `${newCustomColors},`);

            } else {
                // If match fails, fallback to simple replacement (destructive but safe for now?)
                // Or maybe the block is single line?
                // Let's assume standard formatting from previous edits.
            }
        }

        fs.writeFileSync(targetPath, content);

        return NextResponse.json({ success: true, message: 'Configuration updated' });
    } catch (error) {
        console.error('Error updating config:', error);
        return NextResponse.json({ success: false, error: 'Failed to update configuration' }, { status: 500 });
    }
}
