module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/src/models/Admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const AdminSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    adminId: {
        type: String,
        required: true,
        unique: true
    },
    features: {
        flights: {
            type: Boolean,
            default: false
        },
        hotels: {
            type: Boolean,
            default: false
        },
        trains: {
            type: Boolean,
            default: false
        },
        cabs: {
            type: Boolean,
            default: false
        },
        carRentals: {
            type: Boolean,
            default: false
        },
        bikeRentals: {
            type: Boolean,
            default: false
        },
        villas: {
            type: Boolean,
            default: false
        },
        cruises: {
            type: Boolean,
            default: false
        }
    },
    theme: {
        primaryColor: {
            type: String,
            default: '#000000'
        },
        secondaryColor: {
            type: String,
            default: '#ffffff'
        },
        mode: {
            type: String,
            enum: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        fontFamily: {
            type: String,
            default: 'Inter'
        },
        layout: {
            type: String,
            default: 'classic'
        }
    },
    companyDetails: {
        name: {
            type: String
        },
        logoUrl: {
            type: String
        },
        description: {
            type: String
        }
    },
    contact: {
        phone: {
            type: String
        },
        email: {
            type: String
        },
        address: {
            type: String
        }
    },
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    content: {
        aboutUs: {
            type: String
        },
        career: {
            type: String
        },
        blog: {
            type: String
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
// Check if model is already compiled to avoid Hot Reload errors
const Admin = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Admin || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Admin', AdminSchema);
const __TURBOPACK__default__export__ = Admin;
}),
"[project]/src/app/api/config/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Admin.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
const pump = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["pipeline"]);
const dynamic = 'force-dynamic';
const revalidate = 0;
async function POST(req) {
    try {
        const formData = await req.formData();
        console.log("[POST Config] Incoming FormData Keys:", [
            ...formData.keys()
        ]);
        console.log("[POST Config] adminUserId from FormData:", formData.get('adminUserId'));
        // Read existing file content first to support partial updates (preservation)
        const targetPath = 'd:\\NEXT.js\\SuperAdmin\\templates\\TravelPlannerWebsite\\src\\config\\siteConfig.ts';
        let existingContent = '';
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(targetPath)) {
            try {
                existingContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(targetPath, 'utf8');
            } catch (e) {}
        }
        // Helper to extract value from existing content
        const getExisting = (key, defaultVal = '')=>{
            const match = existingContent.match(new RegExp(`${key}:\\s*[\`"]([^\`"]*)[\`"]`));
            return match ? match[1] : defaultVal;
        };
        const getExistingContent = (key)=>{
            const match = existingContent.match(new RegExp(`${key}:\\s*\`([^\`]*)\``));
            if (match) return match[1];
            const matchQuote = existingContent.match(new RegExp(`${key}:\\s*"([^"]*)"`));
            return matchQuote ? matchQuote[1] : '';
        };
        const name = formData.get('name');
        const description = formData.get('description');
        const adminUserIdInput = formData.get('adminUserId');
        const adminUserId = adminUserIdInput !== null ? adminUserIdInput : getExisting('adminUserId');
        console.log("[POST Config] Processing update for adminUserId:", adminUserId);
        const featuresStr = formData.get('features');
        const logoFile = formData.get('logoFile');
        const logoPathRaw = formData.get('logoPath');
        const primaryColor = formData.get('primaryColor');
        const theme = formData.get('theme');
        const layout = formData.get('layout');
        const heroImage = formData.get('heroImage');
        // Admin Content Fields
        const contactPhone = formData.get('contact_phone') !== null ? formData.get('contact_phone') : getExisting('phone', '+1 (555) 123-4567');
        const contactEmail = formData.get('contact_email') !== null ? formData.get('contact_email') : getExisting('email', 'support@travelpanner.com');
        const contactAddress = formData.get('contact_address') !== null ? formData.get('contact_address') : getExisting('address', '123 Travel Street, Cloud City, TC 90210');
        const socialTwitter = formData.get('social_twitter') !== null ? formData.get('social_twitter') : getExisting('twitter', 'https://twitter.com/travelpanner');
        const socialFacebook = formData.get('social_facebook') !== null ? formData.get('social_facebook') : getExisting('facebook', 'https://facebook.com/travelpanner');
        const socialInstagram = formData.get('social_instagram') !== null ? formData.get('social_instagram') : getExisting('instagram', 'https://instagram.com/travelpanner');
        const socialLinkedin = formData.get('social_linkedin') !== null ? formData.get('social_linkedin') : getExisting('linkedin', 'https://linkedin.com/company/travelpanner');
        const contentAboutUs = formData.get('content_aboutUs') !== null ? formData.get('content_aboutUs') : getExistingContent('aboutUs');
        const contentCareer = formData.get('content_career') !== null ? formData.get('content_career') : getExistingContent('career');
        const contentBlog = formData.get('content_blog') !== null ? formData.get('content_blog') : getExistingContent('blog');
        const features = (()=>{
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
            const fileName = `logo-${Date.now()}${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(logoFile.name)}`;
            // Save to Template's public folder
            const uploadDir = 'd:\\NEXT.js\\SuperAdmin\\templates\\TravelPlannerWebsite\\public\\uploads';
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadDir)) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadDir, {
                    recursive: true
                });
            }
            const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadDir, fileName);
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, buffer);
            logoUrl = `/uploads/${fileName}`;
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
    ${(()=>{
            let customColorsBlock = `customColors: {
        background: "",
        header: ""
    }`;
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(targetPath)) {
                try {
                    const existing = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(targetPath, 'utf8');
                    const match = existing.match(/customColors:\s*\{[\s\S]*?\}(?=\,\s*theme:)/);
                    if (match) customColorsBlock = match[0];
                } catch (e) {}
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
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(targetPath, fileContent, 'utf-8');
        // Save to MongoDB
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
            // Construct update object with explicit checks to avoid overwriting with defaults/empty if not intended?
            // Actually, frontend sends full state, so we can overwrite.
            // But we must map the form keys to the schema keys correctly.
            const featuresToSave = {
                flights: features.flights !== undefined ? features.flights : true,
                hotels: features.hotels !== undefined ? features.hotels : true,
                trains: features.trains !== undefined ? features.trains : true,
                cabs: features.cabs !== undefined ? features.cabs : true,
                carRentals: features.rentals !== undefined ? features.rentals : true,
                villas: features.villas !== undefined ? features.villas : true,
                cruises: features.cruises !== undefined ? features.cruises : true
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOneAndUpdate({
                adminId: adminUserId || 'default'
            }, {
                $set: {
                    features: featuresToSave,
                    theme: {
                        mode: theme || 'light',
                        primaryColor: primaryColor || '#3b82f6',
                        layout: layout || 'classic'
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
            }, {
                upsert: true,
                new: true
            });
        } catch (dbError) {
            console.error('MongoDB Error:', dbError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Configuration updated successfully'
        });
    } catch (error) {
        console.error('Error updating config:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to update configuration'
        }, {
            status: 500
        });
    }
}
async function GET() {
    try {
        const targetPath = 'd:\\NEXT.js\\SuperAdmin\\templates\\TravelPlannerWebsite\\src\\config\\siteConfig.ts';
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(targetPath)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Config file not found'
            }, {
                status: 404
            });
        }
        const fileContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(targetPath, 'utf8');
        // Very basic parsing to extract values - this is brittle but avoids eval
        // A robust solution would use an AST parser
        // Robust extraction helper
        const extract = (key)=>{
            const regex = new RegExp(`${key}\\s*:\\s*(["'\`])((?:\\\\.|(?!\\1).)*)\\1`);
            const match = fileContent.match(regex);
            return match ? match[2] : '';
        };
        const configAdminId = extract('adminUserId');
        console.log(`[GET Config] Reading config from: ${targetPath}`);
        console.log(`[GET Config] Extracted adminUserId: "${configAdminId}"`);
        const extractBool = (key)=>{
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
            news: extractBool('news')
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
                address: extract('address')
            },
            social: {
                twitter: extract('twitter'),
                facebook: extract('facebook'),
                instagram: extract('instagram'),
                linkedin: extract('linkedin')
            },
            content: {
                aboutUs: fileContent.match(/aboutUs:\s*`([^`]*)`/)?.[1] || '',
                career: fileContent.match(/career:\s*`([^`]*)`/)?.[1] || '',
                blog: fileContent.match(/blog:\s*`([^`]*)`/)?.[1] || ''
            }
        };
        // Try to fetch from MongoDB first to get the latest persisted state
        // Try to fetch from MongoDB first to get the latest persisted state (Automated Sync)
        let dbConfig = null;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
            if (config.adminUserId) {
                console.log("[GET Config] Querying DB for:", config.adminUserId);
                const adminDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                    adminId: config.adminUserId
                });
                console.log("[GET Config] DB Result found:", !!adminDoc, adminDoc?.adminId);
                if (adminDoc) {
                    dbConfig = {
                        // Use DB value if it exists (including empty string), otherwise undefined (which we will handle/filter later or assume it overwrites)
                        // Actually, spread { ...undefined } does nothing ?? No, { a: undefined } sets a to undefined.
                        // So we should fallback to config.* if adminDoc.* is missing/undefined.
                        name: adminDoc.companyDetails?.name ?? config.name,
                        description: adminDoc.companyDetails?.description ?? config.description,
                        logo: adminDoc.companyDetails?.logoUrl ?? config.logo,
                        adminUserId: adminDoc.adminId,
                        primaryColor: adminDoc.theme?.primaryColor ?? config.primaryColor,
                        theme: adminDoc.theme?.mode ?? config.theme,
                        layout: adminDoc.theme?.layout ?? config.layout,
                        features: {
                            ...features,
                            // Override with specific DB features if present
                            flights: adminDoc.features?.flights ?? features.flights,
                            hotels: adminDoc.features?.hotels ?? features.hotels,
                            trains: adminDoc.features?.trains ?? features.trains,
                            cabs: adminDoc.features?.cabs ?? features.cabs,
                            rentals: adminDoc.features?.carRentals ?? features.rentals,
                            cruises: adminDoc.features?.cruises ?? features.cruises,
                            villas: adminDoc.features?.villas ?? features.villas
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...config,
                ...dbConfig,
                features: {
                    ...config.features,
                    ...dbConfig.features
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(config);
    } catch (error) {
        console.error('Error reading config:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to read configuration'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__95cbffd8._.js.map