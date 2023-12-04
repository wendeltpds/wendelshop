import { NextResponse } from "next/server";
import { productData } from "@/constants/data";


export const GET = async()=> {
    try{
        return NextResponse.json({
            message:"product fetched successfully",
            success: true,
            productData,
        })
    }catch(error) {
        return NextResponse.json({
            error:'product loading erro'
        },
        {status: 500}
        )
    }
}