export const siteConfig = {
    name: "sherrrr",
    adminUserId: "admin456",
    description: "yoyoyoyoyyoyo",
    logo: "/uploads/logo-1769412461002.png",
    primaryColor: "#8b5cf6",
    customColors: {
        background: "",
        header: ""
    },
    theme: "dark",
    layout: "modern",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    features: {
        flights: false,
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
        phone: "88888888",
        email: "lalalala@gmsil.com",
        address: "55fgvctxcchv"
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
