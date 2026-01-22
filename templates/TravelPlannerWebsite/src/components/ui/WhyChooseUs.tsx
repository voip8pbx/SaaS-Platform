import { siteConfig } from "@/config/siteConfig";
import { StandardWhyChooseUs } from "@/components/layouts/StandardWhyChooseUs";
import { ClassicWhyChooseUs } from "@/components/layouts/classic/ClassicWhyChooseUs";

export function WhyChooseUsSection() {
    if (siteConfig.layout === 'classic') {
        return <ClassicWhyChooseUs />;
    }
    return <StandardWhyChooseUs />;
}
