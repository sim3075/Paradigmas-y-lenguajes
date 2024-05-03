import { Types, Schema } from "mongoose"

export const roomSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    type: { type: String, required: true },
    roomNumber: { type: String },
    beds: {
        type: [{
            amount: { type: Number, required: true, min: 0 },
            description: { type: String, maxlength: 30, required: true },
            _id: false,
        }], required: true
    },
    bathrooms: { type: Number, required: true, min: 0 },
    price: {
        currency: { type: String, required: true, maxlength: 3 },
        amount: { type: Number, required: true, min: 0 }
    },
    squares: { type: Number, min: 0 },
    features: { type: [String], required: true },
    guestCapacity: { type: Number, required: true, min: 0 },

})
