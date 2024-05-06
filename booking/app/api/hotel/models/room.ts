import { Types, Schema } from "mongoose"

export const roomSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    type: { type: String, required: true },
    roomNumber: { type: Number },
    beds: {
        type: [{
            amount: { type: Number, required: true },
            description: { type: String, maxlength: 30, required: true }
        }], required: true
    },
    bathrooms: { type: Number, required: true },
    price: {
        concurrency: { type: String, required: true, maxlength: 3 },
        amount: { type: Number, required: true }
    },
    squares: Number,
    features: { type: [String], required: true },
    guestCapacity: { type: Number, required: true },

})
