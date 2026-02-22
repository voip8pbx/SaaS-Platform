import { siteConfig } from "@/config/client/siteConfig";
import { StandardWhyChooseUs } from "@/components/client/layouts/StandardWhyChooseUs";
import { ClassicWhyChooseUs } from "@/components/client/layouts/classic/ClassicWhyChooseUs";

export function WhyChooseUsSection() {
    if (siteConfig.layout === 'classic') {
        return <ClassicWhyChooseUs />;
    }
    return <StandardWhyChooseUs />;
}
