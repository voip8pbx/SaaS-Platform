import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const featuresStr = formData.get('features') as string;
        const logoFile = formData.get('logoFile') as File | null;
        const logoPathRaw = formData.get('logoPath') as string;
        const primaryColor = formData.get('primaryColor') as string;
        const theme = formData.get('theme') as string;
        const layout = formData.get('layout') as string;
        const heroImage = formData.get('heroImage') as string;

        const features = JSON.parse(featuresStr);

        let logoUrl = logoPathRaw || '';

        // Handle File Upload
        if (logoFile && logoFile.size > 0) {
            const buffer = Buffer.from(await logoFile.arrayBuffer());
            const fileName = `logo-${Date.now()}${path.extname(logoFile.name)}`;
            // Save to Template's public folder
            const uploadDir = 'd:\\NEXT.js\\SuperAdmin\\templates\\TravelPlannerWebsite\\public\\uploads';

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, buffer);

            logoUrl = `/uploads/${fileName}`;
        }

        // Create target path constant early
        const targetPath = 'd:\\NEXT.js\\SuperAdmin\\templates\\TravelPlannerWebsite\\src\\config\\siteConfig.ts';

        // Construct the file content
        const fileContent = `export const siteConfig = {
    name: "${name}",
    description: "${description}",
    logo: "${logoUrl}",
    primaryColor: "${primaryColor || '#3b82f6'}",
    ${(() => {
                let customColorsBlock = `customColors: {
        background: "",
        header: ""
    }`;
                if (fs.existsSync(targetPath)) {
                    try {
                        const existing = fs.readFileSync(targetPath, 'utf8');
                        const match = existing.match(/customColors:\s*\{[\s\S]*?\}(?=\,\s*theme:)/);
                        if (match) customColorsBlock = match[0];
                    } catch (e) { /* ignore */ }
                }
                return customColorsBlock;
            })()},
    theme: "${theme || 'light'}",
    layout: "${layout || 'classic'}",
    heroImage: "${heroImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop'}",
    features: {
        flights: ${features.flights},
        packages: ${features.packages},
        hotels: ${features.hotels !== undefined ? features.hotels : true},
        trains: ${features.trains !== undefined ? features.trains : true},
        cabs: ${features.cabs !== undefined ? features.cabs : true},
        rentals: ${features.rentals !== undefined ? features.rentals : true},
        cars: ${features.cars || false},
        aiPlanner: ${features.aiPlanner || false},
        cruises: ${features.cruises !== undefined ? features.cruises : true},
        villas: ${features.villas !== undefined ? features.villas : true},
        news: ${features.news !== undefined ? features.news : true}
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "support@travelpanner.com",
        address: "123 Travel Street, Cloud City, TC 90210"
    },
    social: {
        twitter: "https://twitter.com/travelpanner",
        facebook: "https://facebook.com/travelpanner",
        instagram: "https://instagram.com/travelpanner",
        linkedin: "https://linkedin.com/company/travelpanner"
    },
    currency: {
        code: "USD", // default
        symbol: "$" // default
    }
};

export type SiteConfig = typeof siteConfig;
`;

        fs.writeFileSync(targetPath, fileContent, 'utf-8');

        return NextResponse.json({ success: true, message: 'Configuration updated successfully' });
    } catch (error) {
        console.error('Error updating config:', error);
        return NextResponse.json({ success: false, error: 'Failed to update configuration' }, { status: 500 });
    }
}
