import { type NextRequest } from 'next/server'
import { HotelService } from '@/services/hotel';
import { connectDb } from "@/libs/db/mongodb";

export async function POST(request: NextRequest) {
    try {
        await connectDb()
        return Response.json(await HotelService.create(await request.json()))

    } catch (error) {
        return Response.json(error)
    }

}

export async function GET(request: NextRequest) {
    await connectDb()

    const filter = HotelService.filter(request.nextUrl.searchParams)
    console.log(JSON.stringify(filter, null, 2));

    return Response.json(await HotelService.get(filter))
}






