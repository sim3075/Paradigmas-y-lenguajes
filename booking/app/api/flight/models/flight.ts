import { Schema, model, models, Types } from "mongoose";

const FlightSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true },
  origin: { type: String, required: true },
  destination: { type: String, require: true },
  image: { type: String, require: true },
  departure_date: { type: Date, require: true, default: Date.now },
  return_date: { type: Date, require: true },
  available_seats: { type: Number, required: true },
  price: { type: Number, require: true },
});

export const FlightModel = models.Flight || model("Flight", FlightSchema);
