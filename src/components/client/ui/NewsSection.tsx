import { siteConfig } from "@/config/client/siteConfig";
import { ClassicNews } from "@/components/client/layouts/classic/ClassicNews";

export function NewsSection() {
    // Check if news feature is enabled
    if (!siteConfig.features.news) return null;

    if (siteConfig.layout === 'classic') {
        return <ClassicNews />;
    }

    // Default or other layouts
    return <ClassicNews />;
}
