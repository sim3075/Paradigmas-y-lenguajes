import { IRoom } from "./IRoom"

export interface IHotel {
    name?: string,
    location?: {
        country?: string,
        state?: string,
        city?: string,
        neighborhood?: string,
        address?: string
    },
    contact?: {
        prefix?: number,
        phone?: number,
        web?: string,
    },
    stars?: number,
    rating?: {
        total?: number,
        votes?: number,
    },
    features?: string[],
    rooms?: IRoom[]
}
