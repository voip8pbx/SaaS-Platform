export const siteConfig = {
    name: "Sky Trip",
    adminUserId: "Admin123",
    description: "The best way to plan your next adventure.",
    logo: "/uploads/logo-1769412461002.png",
    primaryColor: "#8b5cf6",
    customColors: {
        background: "",
        header: ""
    },
    theme: "system",
    layout: "classic",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    features: {
        flights: false,
        packages: true,
        hotels: true,
        trains: false,
        cabs: true,
        rentals: true,
        cars: false,
        aiPlanner: true,
        cruises: true,
        villas: true,
        news: true
    },
    contact: {
        phone: "123456",
        email: "lalalala@gmsil.com",
        address: "aaaaaaaaaaaa"
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
