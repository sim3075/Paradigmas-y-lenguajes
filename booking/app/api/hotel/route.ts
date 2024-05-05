
import { HotelModel } from "./models/hotel";
import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/db/mongodb";

export async function GET() {
    await connectDb()

    const hotel = await HotelModel.find()
    return NextResponse.json(hotel)
}