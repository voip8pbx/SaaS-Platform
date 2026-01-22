import { HeroSection } from "@/components/ui/HeroSection";
import { DealsSection } from "@/components/ui/DealsSection";
import { NewsSection } from "@/components/ui/NewsSection";
import { WhyChooseUsSection } from "@/components/ui/WhyChooseUs";
import { siteConfig } from "@/config/siteConfig";
import { ModernHome } from "@/components/layouts/modern/ModernHome";

export default function Home() {
  // If modern layout is selected, render the specific ModernHome component structure
  if (siteConfig.layout === 'modern') {
    return <ModernHome />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <DealsSection />

      {/* News Section */}
      <NewsSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
    </div>
  );
}
