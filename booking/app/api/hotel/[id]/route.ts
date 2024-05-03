import { type NextRequest, NextResponse } from "next/server";
import { HotelService } from "../services/hotel";
import { connectDb } from "@/app/libs/db/mongodb";
import { LoggerService } from "@/app/api/logger/loggerService";


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const initTime = Date.now()
        await connectDb()

        const deleted = await HotelService.delete(params.id)

        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: deleted })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }

}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const initTime = Date.now()

        await connectDb()
        const hotel = await HotelService.getById(params.id)

        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: hotel })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }

}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const initTime = Date.now()

        await connectDb()
        const updatedData = await request.json()
        const hotelUpdated = await HotelService.patch(params.id, updatedData)

        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: hotelUpdated })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }
}

