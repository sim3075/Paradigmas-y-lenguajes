import { Types, Schema, model, models } from "mongoose"
export const reservationSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    user: {
        name: { type: String, required: true },
        id: { type: String, required: true },
        contact: {
            prefix: { type: Number, required: true },
            phone: { type: Number, required: true },
            email: { type: String, required: true }
        }
    },
    guests: { type: Number, required: true },
    id_flight: { type: Date, required: true },
}, { timestamps: true })

export const ReservationModel = models.Reservation || model("Reservation", reservationSchema);
