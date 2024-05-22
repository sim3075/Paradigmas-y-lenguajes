import { type NextRequest } from "next/server";
import { carService } from "../services/car";
import { connectDb } from "@/app/libs/db/mongodb";

export async function GET(request: NextRequest) {
  await connectDb();

  return Response.json(await carService.filter(request.nextUrl.searchParams));
}
