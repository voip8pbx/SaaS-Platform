import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

const pump = promisify(pipeline);

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await dbConnect(); // Ensure DB is connected first
        const formData = await req.formData() as any;
        console.log("[POST Config] Incoming FormData Keys:", [...formData.keys()]);
        console.log("[POST Config] adminUserId from FormData:", formData.get('adminUserId'));

        // Read existing file content first to support partial updates (preservation)
        const targetPath = path.join(process.cwd(), 'templates', 'TravelPlannerWebsite', 'src', 'config', 'siteConfig.ts');
        let existingContent = '';
        if (fs.existsSync(targetPath)) {
            try {
                existingContent = fs.readFileSync(targetPath, 'utf8');
            } catch (e) { /* ignore */ }
        }

        // Helper to extract value from existing content
        const getExisting = (key: string, defaultVal: string = '') => {
            const match = existingContent.match(new RegExp(`${key}:\\s*[\`"]([^\`"]*)[\`"]`));
            return match ? match[1] : defaultVal;
        };

        const getExistingContent = (key: string) => {
            const match = existingContent.match(new RegExp(`${key}:\\s*\`([^\`]*)\``));
            if (match) return match[1];
            const matchQuote = existingContent.match(new RegExp(`${key}:\\s*"([^"]*)"`));
            return matchQuote ? matchQuote[1] : '';
        };
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        const adminUserIdInput = formData.get('adminUserId');
        const adminUserId = adminUserIdInput !== null ? adminUserIdInput as string : getExisting('adminUserId');
        console.log("[POST Config] Processing update for adminUserId:", adminUserId);

        const featuresStr = formData.get('features') as string;
        const logoFile = formData.get('logoFile') as File | null;
        const logoPathRaw = formData.get('logoPath') as string;
        const primaryColor = formData.get('primaryColor') as string;
        const theme = formData.get('theme') as string;
        const layout = formData.get('layout') as string;
        const heroImage = formData.get('heroImage') as string;

        // Admin Content Fields
        const contactPhone = formData.get('contact_phone') !== null ? formData.get('contact_phone') as string : getExisting('phone', '+1 (555) 123-4567');
        const contactEmail = formData.get('contact_email') !== null ? formData.get('contact_email') as string : getExisting('email', 'support@travelpanner.com');
        const contactAddress = formData.get('contact_address') !== null ? formData.get('contact_address') as string : getExisting('address', '123 Travel Street, Cloud City, TC 90210');

        const socialTwitter = formData.get('social_twitter') !== null ? formData.get('social_twitter') as string : getExisting('twitter', 'https://twitter.com/travelpanner');
        const socialFacebook = formData.get('social_facebook') !== null ? formData.get('social_facebook') as string : getExisting('facebook', 'https://facebook.com/travelpanner');
        const socialInstagram = formData.get('social_instagram') !== null ? formData.get('social_instagram') as string : getExisting('instagram', 'https://instagram.com/travelpanner');
        const socialLinkedin = formData.get('social_linkedin') !== null ? formData.get('social_linkedin') as string : getExisting('linkedin', 'https://linkedin.com/company/travelpanner');

        const contentAboutUs = formData.get('content_aboutUs') !== null ? formData.get('content_aboutUs') as string : getExistingContent('aboutUs');
        const contentCareer = formData.get('content_career') !== null ? formData.get('content_career') as string : getExistingContent('career');
        const contentBlog = formData.get('content_blog') !== null ? formData.get('content_blog') as string : getExistingContent('blog');

        const features = (() => {
            try {
                const parsed = JSON.parse(featuresStr || '{}');
                console.log("Config Update - Received Features:", parsed);
                return parsed;
            } catch (e) {
                console.error("Config Update - JSON Parse Error:", e);
                return {};
            }
        })();

        let logoUrl = logoPathRaw || '';

        // Handle File Upload
        if (logoFile && logoFile.size > 0) {
            const buffer = Buffer.from(await logoFile.arrayBuffer());
            const fileName = `logo-${Date.now()}${path.extname(logoFile.name)}`;
            // Save to Template's public folder
            const uploadDir = path.join(process.cwd(), 'templates', 'TravelPlannerWebsite', 'public', 'uploads');

            try {
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const filePath = path.join(uploadDir, fileName);
                fs.writeFileSync(filePath, buffer);

                logoUrl = `/uploads/${fileName}`;
            } catch (e) {
                console.warn('Failed to save logo file (likely read-only filesystem on Vercel):', e);
                // On Vercel, this will fail. Ideally, logo should be uploaded to S3 or similar.
                // We'll keep the previous logoUrl if this fails.
                logoUrl = getExisting('logo');
            }
        } else if (!logoUrl) {
            logoUrl = getExisting('logo');
        }

        // Target path is already defined at start of function


        // Construct the file content
        const fileContent = `export const siteConfig = {
    name: "${name}",
    adminUserId: "${adminUserId}",
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
        flights: ${features.flights !== undefined ? features.flights : true},
        packages: ${features.packages !== undefined ? features.packages : true},
        hotels: ${features.hotels !== undefined ? features.hotels : true},
        trains: ${features.trains !== undefined ? features.trains : true},
        cabs: ${features.cabs !== undefined ? features.cabs : true},
        rentals: ${features.rentals !== undefined ? features.rentals : true},
        cars: ${features.cars !== undefined ? features.cars : false},
        aiPlanner: ${features.aiPlanner !== undefined ? features.aiPlanner : false},
        cruises: ${features.cruises !== undefined ? features.cruises : true},
        villas: ${features.villas !== undefined ? features.villas : true},
        news: ${features.news !== undefined ? features.news : true}
    },
    contact: {
        phone: "${contactPhone || '+1 (555) 123-4567'}",
        email: "${contactEmail || 'support@travelpanner.com'}",
        address: "${contactAddress || '123 Travel Street, Cloud City, TC 90210'}"
    },
    social: {
        twitter: "${socialTwitter || 'https://twitter.com/travelpanner'}",
        facebook: "${socialFacebook || 'https://facebook.com/travelpanner'}",
        instagram: "${socialInstagram || 'https://instagram.com/travelpanner'}",
        linkedin: "${socialLinkedin || 'https://linkedin.com/company/travelpanner'}"
    },
    content: {
        aboutUs: \`${contentAboutUs || ''}\`,
        career: \`${contentCareer || ''}\`,
        blog: \`${contentBlog || ''}\`
    },
    currency: {
        code: "USD", // default
        symbol: "$" // default
    }
};

export type SiteConfig = typeof siteConfig;
`;

        try {
            fs.writeFileSync(targetPath, fileContent, 'utf-8');
        } catch (e) {
            console.warn('Failed to save siteConfig.ts to disk (likely read-only filesystem on Vercel). Using DB as source of truth.', e);
        }

        // Save to MongoDB
        try {
            await dbConnect();

            // Construct update object with explicit checks to avoid overwriting with defaults/empty if not intended?
            // Actually, frontend sends full state, so we can overwrite.
            // But we must map the form keys to the schema keys correctly.

            const featuresToSave = {
                flights: features.flights !== undefined ? features.flights : true,
                hotels: features.hotels !== undefined ? features.hotels : true,
                trains: features.trains !== undefined ? features.trains : true,
                cabs: features.cabs !== undefined ? features.cabs : true,
                carRentals: features.rentals !== undefined ? features.rentals : true, // Map rentals to carRentals
                villas: features.villas !== undefined ? features.villas : true,
                cruises: features.cruises !== undefined ? features.cruises : true,
            };

            await Admin.findOneAndUpdate(
                { adminId: adminUserId || 'default' },
                {
                    $set: {
                        features: featuresToSave,
                        theme: {
                            mode: theme || 'light',
                            primaryColor: primaryColor || '#3b82f6',
                            layout: layout || 'classic',
                        },
                        companyDetails: {
                            name: name,
                            description: description,
                            logoUrl: logoUrl
                        },
                        contact: {
                            phone: contactPhone,
                            email: contactEmail,
                            address: contactAddress
                        },
                        social: {
                            twitter: socialTwitter,
                            facebook: socialFacebook,
                            instagram: socialInstagram,
                            linkedin: socialLinkedin
                        },
                        content: {
                            aboutUs: contentAboutUs,
                            career: contentCareer,
                            blog: contentBlog
                        }
                    }
                },
                { upsert: true, new: true }
            );
        } catch (dbError) {
            console.error('MongoDB Error:', dbError);
        }

        return NextResponse.json({ success: true, message: 'Configuration updated successfully' });
    } catch (error) {
        console.error('Error updating config:', error);
        return NextResponse.json({ success: false, error: 'Failed to update configuration' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect(); // Ensure DB is connected first
        const targetPath = path.join(process.cwd(), 'templates', 'TravelPlannerWebsite', 'src', 'config', 'siteConfig.ts');
        if (!fs.existsSync(targetPath)) {
            return NextResponse.json({ success: false, error: 'Config file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(targetPath, 'utf8');

        // Very basic parsing to extract values - this is brittle but avoids eval
        // A robust solution would use an AST parser
        // Robust extraction helper
        const extract = (key: string) => {
            const regex = new RegExp(`${key}\\s*:\\s*(["'\`])((?:\\\\.|(?!\\1).)*)\\1`);
            const match = fileContent.match(regex);
            return match ? match[2] : '';
        };

        const configAdminId = extract('adminUserId');
        console.log(`[GET Config] Reading config from: ${targetPath}`);
        console.log(`[GET Config] Extracted adminUserId: "${configAdminId}"`);

        const extractBool = (key: string) => {
            const match = fileContent.match(new RegExp(`${key}:\\s*(true|false)`));
            return match ? match[1] === 'true' : false;
        };

        // For features which are nested
        const features = {
            flights: extractBool('flights'),
            packages: extractBool('packages'),
            hotels: extractBool('hotels'),
            trains: extractBool('trains'),
            cabs: extractBool('cabs'),
            rentals: extractBool('rentals'),
            cars: extractBool('cars'),
            aiPlanner: extractBool('aiPlanner'),
            cruises: extractBool('cruises'),
            villas: extractBool('villas'),
            news: extractBool('news'),
        };

        const config = {
            name: extract('name'),
            description: extract('description'),
            logo: extract('logo'),
            adminUserId: extract('adminUserId'),
            primaryColor: extract('primaryColor'),
            theme: extract('theme'),
            layout: extract('layout'),
            heroImage: extract('heroImage'),
            features,
            contact: {
                phone: extract('phone'),
                email: extract('email'),
                address: extract('address'),
            },
            social: {
                twitter: extract('twitter'),
                facebook: extract('facebook'),
                instagram: extract('instagram'),
                linkedin: extract('linkedin'),
            },
            content: {
                aboutUs: fileContent.match(/aboutUs:\s*`([^`]*)`/)?.[1] || '',
                career: fileContent.match(/career:\s*`([^`]*)`/)?.[1] || '',
                blog: fileContent.match(/blog:\s*`([^`]*)`/)?.[1] || '',
            }
        };

        // Try to fetch from MongoDB first to get the latest persisted state
        // Try to fetch from MongoDB first to get the latest persisted state (Automated Sync)
        let dbConfig = null;
        try {
            await dbConnect();
            if (config.adminUserId) {
                console.log("[GET Config] Querying DB for:", config.adminUserId);
                const adminDoc = await Admin.findOne({ adminId: config.adminUserId });
                console.log("[GET Config] DB Result found:", !!adminDoc, adminDoc?.adminId);
                if (adminDoc) {
                    dbConfig = {
                        // Use DB value if it exists (including empty string), otherwise undefined (which we will handle/filter later or assume it overwrites)
                        // Actually, spread { ...undefined } does nothing ?? No, { a: undefined } sets a to undefined.
                        // So we should fallback to config.* if adminDoc.* is missing/undefined.
                        name: adminDoc.companyDetails?.name ?? config.name,
                        description: adminDoc.companyDetails?.description ?? config.description,
                        logo: adminDoc.companyDetails?.logoUrl ?? config.logo,
                        adminUserId: adminDoc.adminId, // Trust DB adminId matches extracted one
                        primaryColor: adminDoc.theme?.primaryColor ?? config.primaryColor,
                        theme: adminDoc.theme?.mode ?? config.theme,
                        layout: adminDoc.theme?.layout ?? config.layout,
                        features: {
                            ...features, // Start with file features
                            // Override with specific DB features if present
                            flights: adminDoc.features?.flights ?? features.flights,
                            hotels: adminDoc.features?.hotels ?? features.hotels,
                            trains: adminDoc.features?.trains ?? features.trains,
                            cabs: adminDoc.features?.cabs ?? features.cabs,
                            rentals: adminDoc.features?.carRentals ?? features.rentals,
                            cruises: adminDoc.features?.cruises ?? features.cruises,
                            villas: adminDoc.features?.villas ?? features.villas,
                            // Force others to default if needed or keep from file
                        },
                        contact: {
                            phone: adminDoc.contact?.phone ?? config.contact.phone,
                            email: adminDoc.contact?.email ?? config.contact.email,
                            address: adminDoc.contact?.address ?? config.contact.address
                        },
                        social: {
                            twitter: adminDoc.social?.twitter ?? config.social.twitter,
                            facebook: adminDoc.social?.facebook ?? config.social.facebook,
                            instagram: adminDoc.social?.instagram ?? config.social.instagram,
                            linkedin: adminDoc.social?.linkedin ?? config.social.linkedin
                        },
                        content: {
                            aboutUs: adminDoc.content?.aboutUs ?? config.content.aboutUs,
                            career: adminDoc.content?.career ?? config.content.career,
                            blog: adminDoc.content?.blog ?? config.content.blog
                        }
                    };
                }
            }
        } catch (e) {
            console.error("Failed to fetch from DB in GET config", e);
        }

        if (dbConfig) {
            return NextResponse.json({ ...config, ...dbConfig, features: { ...config.features, ...dbConfig.features } });
        }

        return NextResponse.json(config);
    } catch (error) {
        console.error('Error reading config:', error);
        return NextResponse.json({ success: false, error: 'Failed to read configuration' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Allow': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
