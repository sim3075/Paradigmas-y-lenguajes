import { HotelModel } from "../models/hotel";
import { IRoom } from "../models/IRoom";

export class RoomService {

    static async create(hotelId: string, room: IRoom) {
        const newRoom = await HotelModel.updateOne({ _id: hotelId },
            { $push: { "rooms": room } },
            { new: true, runValidators: true })

        return newRoom

    }

    static async getById(hotelId: string, roomId: string) {
        const room = await HotelModel.findOne(
            { _id: hotelId, "rooms": { $elemMatch: { _id: roomId } } },
            { "rooms.$": 1, _id: 0 }
        )

        return room

    }

    static async getAll(hotelId: string) {
        const rooms = await HotelModel.findOne(
            { _id: hotelId }
        ).select("rooms -_id")
        return rooms

    }

    static async delete(hotelId: string, roomId: string) {
        return await HotelModel.updateOne(
            { _id: hotelId },
            { $pull: { "rooms": { "_id": { $eq: roomId } } } }
        )

    }

    static async patch(hotelId: string, roomId: string, updatedData: IRoom) {
        updatedData._id = roomId

        return await HotelModel.updateOne(
            { _id: hotelId, "rooms._id": roomId },
            { $set: { "rooms.$": updatedData } },
            { new: true, runValidators: true }
        )

    }

}