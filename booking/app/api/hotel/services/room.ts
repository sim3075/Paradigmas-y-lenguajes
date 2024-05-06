import { HotelModel } from "../models/hotel";
import { IRoom } from "../models/IRoom";

export class RoomService {
    //try catch o middleware con callback para
    //devolver siempre el mismo estilo de error
    static async create(hotelId: string, room: IRoom) {
        try {
            const newRoom = await HotelModel.updateOne({ _id: hotelId },
                { $push: { "rooms": room } },
                { new: true, runValidators: true })
            console.log(newRoom);

            return newRoom
        } catch (error) {
            console.log(error);
        }
    }

    static async getById(hotelId: string, roomId: string) {
        try {
            const room = await HotelModel.findOne(
                { _id: hotelId, "rooms": { $elemMatch: { _id: roomId } } },
                { "rooms.$": 1, _id: 0 }
            )

            return room
        } catch (error) {
            console.log(error);

        }
    }

    static async getAll(hotelId: string) {
        try {
            const rooms = await HotelModel.findOne(
                { _id: hotelId }
            ).select("rooms -_id")
            return rooms
        } catch (error) {
            console.log(error);

        }
    }

    static async delete(hotelId: string, roomId: string) {
        try {
            return await HotelModel.updateOne(
                { _id: hotelId },
                { $pull: { "rooms": { "_id": { $eq: roomId } } } }
            )
        } catch (error) {
            console.log(error);

        }
    }

    static async patch(hotelId: string, roomId: string, updatedData: IRoom) {
        try {
            return await HotelModel.updateOne(
                { _id: hotelId, "rooms._id": roomId },
                { $set: { "rooms.$": updatedData } },
                { new: true, runValidators: true }
            )
        } catch (error) {
            console.log(error);

        }
    }

}