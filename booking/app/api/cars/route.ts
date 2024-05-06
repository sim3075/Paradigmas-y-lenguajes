
import { connectDb } from "@/app/libs/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { CarModel } from "./models/car";


export async function GET(){
    await connectDb()
    try {
        const cars = await CarModel.find()
        return NextResponse.json(cars)
    } catch (error: any) {
        return new NextResponse(error.message)
    }
}


export async function POST(request: NextRequest){
    await connectDb()
    const cars = new CarModel(await request.json())
    cars.save()
    return NextResponse.json(cars)

}