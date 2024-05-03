import { Schema, model, models } from "mongoose";

export const loggerSchema = new Schema({
    httpMethod: { type: String, required: true },
    path: { type: String, required: true },
    userId: { type: String },
    responseTime: { type: Number, required: true },
    clientIp: { type: String, required: true }
}, { timestamps: true });

export const LoggerModel = models.Logger || model("Logger", loggerSchema)
