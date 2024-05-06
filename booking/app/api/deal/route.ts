import { connectDb } from "@/app/libs/db/mongodb"
import { NextRequest, NextResponse } from "next/server"
import { DealModel } from "../cars/models/deal"

export async function GET(){
    await connectDb()
    const deals = await DealModel.find()
    return NextResponse.json(deals)
}

export async function POST(request: NextRequest){
    try {
        await connectDb()
        console.log("Deal Post")
        const deal = new DealModel(await request.json())
        await deal.save()
        console.log("Deal Post:"+deal)
        return NextResponse.json(deal)

    } catch (error:any) {
        return new NextResponse(error.message)
    }
}