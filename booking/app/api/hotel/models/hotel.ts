import { Schema, model, models } from "mongoose";
import { roomSchema } from "./room";

const hotelSchema = new Schema({
    name: { type: String, required: true },
    location: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        neighborhood: { type: String, required: true },
        address: { type: String, required: true },
    },
    contact: {
        prefix: { type: Number, required: true, min: 0 },
        phone: { type: Number, required: true, min: 0 },
        web: String
    },
    stars: { type: Number, required: true, max: 5, min: 0 },
    rating: {
        total: { type: Number, default: 0, min: 0 },
        votes: { type: Number, default: 0, min: 0 }
    },
    features: { type: [String], required: true },
    rooms: [roomSchema]
});

export const HotelModel = models.Hotel || model("Hotel", hotelSchema);