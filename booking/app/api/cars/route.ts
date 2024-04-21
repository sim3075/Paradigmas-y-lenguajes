import { dbConnect } from "@/models/connection";

import { carModel } from "@/models/carSchema"

import { NextRequest, NextResponse } from "next/server";


export async function GET(){

    await dbConnect()

    const cars = await carModel.find()

    return NextResponse.json(cars)

}


export async function POST(request: NextRequest){

    await dbConnect()

    const cars = new carModel(await request.json())

    cars.save()

    return NextResponse.json(cars)

}