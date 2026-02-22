import { HeroSection } from "@/components/client/ui/HeroSection";
import { DealsSection } from "@/components/client/ui/DealsSection";
import { NewsSection } from "@/components/client/ui/NewsSection";
import { WhyChooseUsSection } from "@/components/client/ui/WhyChooseUs";
import { siteConfig } from "@/config/client/siteConfig";
import { ModernHome } from "@/components/client/layouts/modern/ModernHome";

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
