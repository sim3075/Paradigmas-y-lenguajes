import { Types, Schema, model, models } from "mongoose"; 


export const carSchema = new Schema({
    "Placa": { type: String },
    "Color": { type: String, required: true }
})

export const carModel = models.Car  || model("Car", carSchema)
