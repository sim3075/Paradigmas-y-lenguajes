import { IRoom } from "./IRoom";

export interface IHotel {
    id: number;
    type: string;
    name: string;
    location: Location;
    contact: Contact;
    stars: number;
    rating: Rating;
    features: string[];
    rooms: IRoom[];
}

export interface Contact {
    prefix: string;
    phone: string;
    web: string;
}

export interface Location {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
}

export interface Rating {
    total: number;
    votes: number;
}


