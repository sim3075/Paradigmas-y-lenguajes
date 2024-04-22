export interface IRoom {
    type?: string,
    roomNumber?: string
    beds?: number,
    bedsDescription?: string[],
    bathrooms?: number,
    price?: {
        currency?: string,
        amount?: number,
    },
    squares?: number,
    features?: string[],
    guestCapacity?: number,
    totalBedrooms?: number,
    bedrooms?: {
        name?: string,
        status?: string
    }[],
}