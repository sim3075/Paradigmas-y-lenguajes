import { type NextRequest } from "next/server";
import { RoomService } from "../../services/room";
import { connectDb } from "@/app/libs/db/mongodb";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    const room = await request.json()
    
    return Response.json(await RoomService.create(params.id,room))
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDb()
    
    return Response.json(await RoomService.getAll(params.id))
}