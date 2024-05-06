import { connectDb } from "@/app/libs/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { CarModel } from "../models/car";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    return NextResponse.json(await CarModel.findByIdAndDelete(params.id))
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    return NextResponse.json(await CarModel.findById(params.id))

}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    const updatedData = await request.json()
    return NextResponse.json(await CarModel.findByIdAndUpdate(params.id, updatedData, {
        new: true
    }))
}

export async function POST(request: any) {
    try {
        await connectDb()
        const data = await request.json()
        const newCar = new CarModel(data)
        const savedCar = await newCar.save()
        return NextResponse.json(savedCar)
    } catch (error: any) {
        return NextResponse.json(error.message)
    }
}