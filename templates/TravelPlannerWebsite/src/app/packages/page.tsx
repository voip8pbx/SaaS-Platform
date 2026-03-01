import { PackageCard } from "@/components/packages/PackageCard";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import { getPackages } from "@/lib/package-service";

export default async function PackagesPage() {
    const packages = await getPackages();
    const isClassic = siteConfig.layout === 'classic';

    return (
        <div className={cn("min-h-screen py-12", isClassic ? "bg-white dark:bg-slate-950" : "bg-slate-50")}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className={cn("text-4xl font-bold mb-4", isClassic ? "font-serif text-black dark:text-white" : "text-slate-900")}>Holiday Packages</h1>
                    <p className={cn("max-w-2xl mx-auto", isClassic ? "text-gray-600 dark:text-gray-400 font-serif italic" : "text-slate-600")}>Discover our handpicked holiday packages for your perfect vacation.</p>
                </div>

                <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="w-full">
                            <PackageCard pkg={pkg} horizontal />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
