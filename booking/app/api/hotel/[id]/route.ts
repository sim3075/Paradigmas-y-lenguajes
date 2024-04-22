import { type NextRequest } from "next/server";
import { HotelService } from "../services/hotel";
import { connectDb } from "@/app/libs/db/mongodb";
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()

    return Response.json(await HotelService.delete(params.id))
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    return Response.json(await HotelService.getById(params.id))

}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    const updatedData = await request.json()
    return Response.json(await HotelService.patch(params.id, updatedData))
}

