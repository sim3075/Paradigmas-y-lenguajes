import { type NextRequest, NextResponse } from "next/server";
import { RoomService } from "../../../services/room";
import { connectDb } from "@/app/libs/db/mongodb";
import { LoggerService } from "@/app/api/logger/loggerService";

export async function GET(request: NextRequest, { params }: { params: { id: string, roomId: string } }) {
    try {
        const initTime = Date.now()

        await connectDb()
        const room = await RoomService.getById(params.id, params.roomId)
        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: room })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string, roomId: string } }) {
    try {
        const initTime = Date.now()

        await connectDb()
        const deleted = await RoomService.delete(params.id, params.roomId)
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string, roomId: string } }) {
    try {
        const initTime = Date.now()

        await connectDb()
        const updatedData = await request.json()
        const roomUpdated = await RoomService.patch(params.id, params.roomId, updatedData)
        
        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: roomUpdated })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }
}
