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
"[project]/src/app/api/config/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
;
;
;
;
;
const pump = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["pipeline"]);
async function POST(req) {
    try {
        const formData = await req.formData();
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
        const features = JSON.parse(featuresStr || '{}');
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
        cars: ${features.cars || false},
        aiPlanner: ${features.aiPlanner || false},
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
        const extract = (key)=>{
            const match = fileContent.match(new RegExp(`${key}:\\s*"([^"]*)"`));
            return match ? match[1] : '';
        };
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

//# sourceMappingURL=%5Broot-of-the-server%5D__3d160dad._.js.map