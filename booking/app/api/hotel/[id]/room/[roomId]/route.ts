import { type NextRequest } from "next/server";
import { RoomService } from "../../../services/room";
import { connectDb } from "@/app/libs/db/mongodb";

export async function GET(request: NextRequest, { params }: { params: { id: string, roomId: string } }) {
    await connectDb()
    return Response.json(await RoomService.getById(params.id, params.roomId))
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string, roomId: string } }) {
    await connectDb()
    return Response.json(await RoomService.delete(params.id, params.roomId))
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string, roomId: string } }) {
    await connectDb()

    const updatedData = await request.json()    
    return Response.json(await RoomService.patch(params.id, params.roomId, updatedData))
}
