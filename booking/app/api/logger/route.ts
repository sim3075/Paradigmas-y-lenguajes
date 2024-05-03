import { type NextRequest, NextResponse } from "next/server";
import { LoggerService } from "./loggerService";
import { connectDb } from "@/app/libs/db/mongodb";

export async function GET(request: NextRequest) {
    try {
        const initTime = Date.now()
        await connectDb()

        const logs = await LoggerService.getLogs({})

        const endTime = Date.now()

        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })
        return NextResponse.json({ ok: true, response: logs })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const initTime = Date.now()

        const deleteDate = new Date(request.nextUrl.searchParams.get("d"))
        await connectDb()
        if (!deleteDate.getDate() || isNaN(deleteDate.getDate())) {
            throw new Error("Invalid date")
        }
        
        const deleted = await LoggerService.deleteLogs(deleteDate)
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