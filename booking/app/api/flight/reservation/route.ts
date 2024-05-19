import { type NextRequest, NextResponse } from "next/server";
import { ReservationModel } from "../models/reservation";
import { connectDb } from "@/app/libs/db/mongodb";


export async function GET() {
    await connectDb()

    const Reservation = await ReservationModel.find()
    return NextResponse.json(Reservation)
}

export async function POST(request: NextRequest) {
    
    await connectDb()
    const data = await request.json();

    const new_reservation = await ReservationModel.create(data)
    return NextResponse.json(new_reservation)
}

// arreglar el patch

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    const updatedData = await request.json()
    return Response.json(await flightService.patch(params.id, updatedData))
}