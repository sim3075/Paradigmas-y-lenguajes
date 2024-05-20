import { type NextRequest } from "next/server";
import { flightService } from "../services/flight";
import { connectDb } from "@/app/libs/db/mongodb";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();

  return Response.json(await flightService.delete(params.id));
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();
  return Response.json(await flightService.getById(params.id));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();
  const updatedData = await request.json();
  return Response.json(await flightService.patch(params.id, updatedData));
}
