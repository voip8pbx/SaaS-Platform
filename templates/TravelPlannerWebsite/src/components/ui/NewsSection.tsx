import { siteConfig } from "@/config/siteConfig";
import { ClassicNews } from "@/components/layouts/classic/ClassicNews";

export function NewsSection() {
    // Check if news feature is enabled
    if (!siteConfig.features.news) return null;

    if (siteConfig.layout === 'classic') {
        return <ClassicNews />;
    }

    // Default or other layouts
    return <ClassicNews />;
}
