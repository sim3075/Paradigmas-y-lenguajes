import { type NextRequest } from 'next/server';
import { flightService } from '../services/flight';
import { connectDb } from '@/app/libs/db/mongodb';


export async function GET(request: NextRequest) {
    
    await connectDb()

    return Response.json(await flightService.filter(request.nextUrl.searchParams))
}

