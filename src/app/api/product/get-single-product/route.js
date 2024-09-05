import { connectToDB } from "@/database";
import { Product } from "@/models/productSchema";

import { NextResponse } from "next/server";





export async function GET(req){

    try{
        await connectToDB()
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id');


        const product=await Product.findById(id)

        if(product){
            return NextResponse.json({
                success:true,
                product
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'product not found'
            })


        }



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}