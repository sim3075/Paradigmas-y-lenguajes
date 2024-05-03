import { type NextRequest, NextResponse } from "next/server";
import { HotelService } from '../services/hotel'
import { connectDb } from '@/app/libs/db/mongodb'
import { Search } from '../services/search'
import { LoggerService } from "@/app/api/logger/loggerService";

export async function GET(request: NextRequest) {
    try {
        const initTime = Date.now()
        await connectDb()

        const filter = await Search.filter(request.nextUrl.searchParams)

        const searchParams = {}
        if (filter.length > 0) {
            searchParams["$and"] = filter
        }
        const hotels = await HotelService.get(searchParams)

        console.log(JSON.stringify(searchParams, null, 2));

        if (!!request.nextUrl.searchParams.get("sort") && hotels.length > 0) {
            const hotels_sorted = Search.sort(hotels, request.nextUrl.searchParams.get("sort"))
            return NextResponse.json({ ok: true, response: hotels_sorted })
        }
        
        //logger
        const endTime = Date.now()
        await LoggerService.log({
            httpMethod: request.method,
            path: request.nextUrl.pathname,
            responseTime: endTime - initTime,
            clientIp: request.headers.get('X-Forwarded-For') || "0"
        })

        return NextResponse.json({ ok: true, response: hotels })

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ ok: false, error: `${error.name}: ${error.message}` })
    }

}