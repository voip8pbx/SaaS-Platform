export const siteConfig = {
    name: "My Travel Site",
    adminUserId: "",
    description: "The best way to plan your next adventure.",
    logo: "/uploads/logo-1769536776822.png",
    primaryColor: "#8b5cf6",
    customColors: {
        background: "",
        header: ""
    },
    theme: "light",
    layout: "classic",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    features: {
        flights: true,
        packages: true,
        hotels: true,
        trains: true,
        cabs: true,
        rentals: true,
        cars: false,
        aiPlanner: true,
        cruises: true,
        villas: true,
        news: true
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "support@travelpanner.com",
        address: "123 Travel Street, Cloud City, TC 90210"
    },
    social: {
        twitter: "https://twitter.com/travelpanner",
        facebook: "https://facebook.com/travelpanner",
        instagram: "https://instagram.com/travelpanner",
        linkedin: "https://linkedin.com/company/travelpanner"
    },
    content: {
        aboutUs: ``,
        career: ``,
        blog: ``
    },
    currency: {
        code: "USD", // default
        symbol: "$" // default
    }
};

export type SiteConfig = typeof siteConfig;
