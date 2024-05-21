
import { connectDb } from "@/app/libs/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { CarModel } from "./models/car";


export async function GET(){
    await connectDb()
    const cars = await CarModel.find()
    return NextResponse.json(cars)

}


export async function POST(request: NextRequest){
    await connectDb()
    const cars = new CarModel(await request.json())
    cars.save()
    return NextResponse.json(cars)

}