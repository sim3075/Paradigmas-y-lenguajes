import { Schema, model, models, Document } from "mongoose";
import { ICar } from "./car";

export interface IDeal extends Document {
    user: {
        name: string;
        contact: {
            prefix?: number;
            phone: number;
            email: string;
        };
    };
    pickUpDate: Date;
    dropOffDate: Date;
    car: ICar;
    price: number;
}

export const DealSchema = new Schema({
    user: {
        name: String,
        contact: {
            prefix: Number,
            phone: { type: Number, required: true },
            email: { type: String, required: true },
        },
    },
    pickUpDate: { type: Date, required: true },
    dropOffDate: { type: Date, required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car" },
    price: { type: Number, required: true },
});

export const DealModel = models.Deal || model<IDeal>("Deal", DealSchema);
