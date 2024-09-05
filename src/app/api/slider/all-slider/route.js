import { connectToDB } from "@/database";
import { Slider } from "@/models/slider";
import { NextResponse } from "next/server";





export async function GET(req){
    try{

        await connectToDB()

        const sliders=await Slider.find()

        if(sliders){

            return NextResponse.json({
                success:true,
                slider:sliders,
                count:sliders.length
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'not found'
            })

        }



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}