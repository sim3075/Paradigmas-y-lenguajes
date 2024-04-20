import { connection } from "@/models/connection";
import { carModel } from "@/models/carSchema"
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    await connection()
    const cars = await carModel.find()
    return NextResponse.json(cars)
}

export async function POST(request: NextRequest){
    await connection()
    const cars = new carModel(await request.json())
    cars.save()
    return NextResponse.json(cars)
}