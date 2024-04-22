import { Types, Schema, model, models } from "mongoose"
export const reservationSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    user: {
        name: String,
        contact: {
            prefix: { type: Number, required: true },
            phone: { type: Number, required: true },
            email: { type: String, required: true }
        }
    },
    guests: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true }
}, { timestamps: true })

export const ReservationModel = models.Reservation || model("Reservation", reservationSchema);


