export interface SiteConfig {
    name: string;
    description: string;
    logo: string;
    primaryColor: string;
    theme: 'light' | 'dark' | 'system';
    layout: 'classic' | 'modern' | 'minimal' | 'showcase';
    heroImage: string;
    adminUserId: string;
    customColors?: {
        background: string;
        header: string;
    };
    features: {
        flights: boolean;
        packages: boolean;
        hotels: boolean;
        trains: boolean;
        cabs: boolean;
        rentals: boolean;
        cars: boolean;
        aiPlanner: boolean;
        cruises: boolean;
        villas: boolean;
        news: boolean;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
    };
    social: {
        twitter: string;
        facebook: string;
        instagram: string;
        linkedin: string;
    };
    content: {
        aboutUs: string;
        career: string;
        blog: string;
    };
    currency: {
        code: string;
        symbol: string;
    };
}

export interface FlightLeg {
    airline: string;
    airlineCode: string;
    flightNumber: string;
    airlineLogo?: string;
    departureTime: string;
    arrivalTime: string;
    from: string;
    to: string;
    duration: string;
    stops: number;
}

export interface Flight {
    id: string;
    airline: string;
    airlineCode: string;
    flightNumber: string;
    airlineLogo?: string;
    departureTime: string;
    arrivalTime: string;
    from: string;
    to: string;
    duration: string;
    stops: number;
    price: number;
    currency: string;
    returnLeg?: FlightLeg;
}

export interface HotelData {
    id: string;
    name: string;
    address: string;
    price: number;
    rating: number;
    image: string;
    amenities: string[];
    user_ratings_total?: number;
}

export interface RentalData {
    id: string;
    name: string;
    type: 'car' | 'bike';
    image: string;
    price: number;
    rating: number;
    features: string[];
    agency: string;
    address: string;
}
