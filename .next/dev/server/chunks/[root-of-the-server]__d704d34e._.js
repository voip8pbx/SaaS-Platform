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
"[project]/src/app/api/config/customize/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
// Define the path to the template's siteConfig
const targetPath = 'D:\\NEXT.js\\Travelpannerwebsite\\src\\config\\siteConfig.ts';
async function POST(request) {
    try {
        const body = await request.json();
        const { feature, colors, primaryColor } = body;
        // feature: 'flights' | 'packages' | 'global'
        // colors: { header: string, background: string }
        // Read existing file
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(targetPath)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Target config file not found'
            }, {
                status: 404
            });
        }
        let content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(targetPath, 'utf8');
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
                const findValue = (key, text)=>{
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
                const getFeatureBlock = (featName, text)=>{
                    const regex = new RegExp(`${featName}:\\s*\\{([\\s\\S]*?)\\}`);
                    const m = text.match(regex);
                    let featBg = "";
                    let featHeader = "";
                    if (m) {
                        featBg = findValue('background', m[1]);
                        featHeader = findValue('header', m[1]);
                    }
                    return {
                        background: featBg,
                        header: featHeader
                    };
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
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(targetPath, content);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Configuration updated'
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d704d34e._.js.map