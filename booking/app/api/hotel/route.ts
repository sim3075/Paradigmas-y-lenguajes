import { type NextRequest, NextResponse } from 'next/server'
import { HotelService } from './services/hotel'
import { connectDb } from '@/app/libs/db/mongodb'
import { LoggerService } from '@/app/api/logger/loggerService'

export async function POST(request: NextRequest) {
    try {
        const initTime = Date.now()

        await connectDb()
        const newHotel = await HotelService.create(await request.json())

        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: newHotel })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }

}



