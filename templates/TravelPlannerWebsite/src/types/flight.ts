export interface Flight {
    id: string;
    airline: string;
    airlineCode: string;
    flightNumber: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    currency: string;
    stops: number;
    airlineLogo?: string;
    seatsAvailable: number;
    returnLeg?: {
        airline: string;
        airlineCode: string;
        flightNumber: string;
        from: string;
        to: string;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        stops: number;
        airlineLogo?: string;
    };
}
