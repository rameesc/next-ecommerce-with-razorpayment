import { connectToDB } from "@/database";
import { Product } from "@/models/productSchema";
import { NextResponse } from "next/server";







export async function GET(req){

    try{
        await connectToDB()

        const mostSelling=await Product.find({price:{$gt:500}}).limit(4)

        if(mostSelling){

            return NextResponse.json({
                success:true,
                mostSelling
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'item not found'
            })

        }



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}