
import { FlightModel } from "./models/flight";
import { NextResponse, NextRequest} from "next/server";
import { connectDb } from "@/app/libs/db/mongodb";

export async function GET() {
    await connectDb()

    const Flight = await FlightModel.find()
    return NextResponse.json(Flight)
}

export async function POST(request: NextRequest) {
    
    await connectDb()
    const data = await request.json();

    const new_flight = await FlightModel.create(data)
    return NextResponse.json(new_flight)
}