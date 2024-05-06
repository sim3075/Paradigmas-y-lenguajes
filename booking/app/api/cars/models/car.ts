import { Schema, model, models, Document } from "mongoose"; 

export interface ICar extends Document{
    photo: string;
    brand: string;
    plate: string;
    city: string;
    seats: number;
    description?: string;
}


export const carSchema:Schema = new Schema({
    photo: { 
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true  
    },
    plate: {type: String, required: true},
    city: {type: String, required: true},
    seats: {type: Number, required: true},
    description: [String],
})

export const CarModel = models.Car  || model<ICar>("Car", carSchema)