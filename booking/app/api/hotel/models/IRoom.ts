
export interface Price {
    currency: string;
    amount: number;
}

export interface IRoom {
    _id: string
    type: string;
    name: string;
    beds: string[];
    bathrooms: number;
    price: Price;
    size: number;
    features: string[];
    guest_capacity: number;
}
