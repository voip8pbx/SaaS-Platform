import { NextResponse } from 'next/server';

const MOCK_PACKAGES = [
    {
        id: "PKG001",
        title: "Magical Maldives",
        location: "Maldives",
        duration: "5 Nights / 6 Days",
        price: 45000,
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
        rating: 4.8,
        reviews: 120,
        amenities: ["Flight", "Hotel", "Meals", "Transfer"]
    },
    {
        id: "PKG002",
        title: "Dubai Delight",
        location: "Dubai",
        duration: "4 Nights / 5 Days",
        price: 35000,
        image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2000&auto=format&fit=crop",
        rating: 4.5,
        reviews: 85,
        amenities: ["Flight", "Hotel", "Sightseeing", "Visa"]
    },
    {
        id: "PKG003",
        title: "Bali Bliss",
        location: "Bali, Indonesia",
        duration: "6 Nights / 7 Days",
        price: 55000,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        rating: 4.7,
        reviews: 200,
        amenities: ["Flight", "Villa", "Breakfast", "Tours"]
    },
    {
        id: "PKG004",
        title: "Kerala Backwaters",
        location: "Kerala, India",
        duration: "3 Nights / 4 Days",
        price: 18000,
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
        rating: 4.6,
        reviews: 150,
        amenities: ["Houseboat", "Meals", "Transfer"]
    }
];

export async function GET(request: Request) {
    return NextResponse.json(MOCK_PACKAGES);
}
