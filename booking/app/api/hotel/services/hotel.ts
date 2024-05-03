import { HotelModel } from "../models/hotel";
import { IHotel } from "../models/IHotel";

export class HotelService {

    static async create(hotel: IHotel) {
        return await new HotelModel(hotel).save()
    }

    static async get(filter: any) {
        return await HotelModel.find(filter)
    }

    static async getById(id: string) {
        const hotel = await HotelModel.findById(id)
        return hotel
    }

    static async delete(hotelId: string) {
        return await HotelModel.findOneAndDelete({ _id: hotelId })
    }

    static async patch(hotelId: string, updatedData: IHotel) {
        delete updatedData.rooms
        return await HotelModel.findOneAndUpdate({ _id: hotelId }, updatedData, {
            new: true,
            runValidators: true
        })

    }

}


