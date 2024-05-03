import { LoggerModel } from "./loggerSchema";

type logger = {
    userId?: string
    httpMethod: string
    path: string
    responseTime: number
    clientIp: string
    createdAt?: Date
    updatedAt?: Date
}

export class LoggerService {

    static async log(body: logger) {
        return await new LoggerModel(body).save()
    }

    static async getLogs(filter: any) {
        return await LoggerModel.find(filter || {})
    }

    static async deleteLogs(timeToDelete: Date) {
       return await LoggerModel.deleteMany({ createdAt: { $lte: timeToDelete } })
    }
}