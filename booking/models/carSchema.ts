import { Types, Schema, model, models } from "mongoose"; 


export const carSchema = new Schema({
    "marca": { type: String, required: true},
    "placa": { type: String, required: true },
    "color": { type: String }
})

export const carModel = models.Car  || model("Car", carSchema)