import { siteConfig } from "@/config/client/siteConfig";
import { StandardDeals } from "@/components/client/layouts/StandardDeals";
import { ClassicDeals } from "@/components/client/layouts/classic/ClassicDeals";

export function DealsSection() {
    if (!siteConfig.features.packages) return null;

    // Layout Router
    if (siteConfig.layout === 'classic') {
        return <ClassicDeals />;
    }

    // Default to Standard (or add more for modern/minimal later)
    return <StandardDeals />;
}
