export interface IReservation {
        bedroomId:string,
        user: {
            name: string,
            contact: {
                prefix: number,
                phone: number,
                email: string,
            },
        },
        guests: number,
        checkIn: string,
        checkOut: string,
}