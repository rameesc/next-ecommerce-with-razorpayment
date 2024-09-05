import { connectToDB } from "@/database"
import { Product } from "@/models/productSchema"
import axios from "axios"
import { NextResponse } from "next/server"





export async function GET(req){

    const {searchParams}=new URL(req.url);
    const page=searchParams.get('page');

    try{
        await connectToDB()
      

        const allProduct=await Product.find({})

         //limit only 10 product
        const limitItem=10

         //total product
        const productLength=allProduct.length;

        //skip
        const pageSkip=Number(page)* limitItem

        //page count
        const pageCount=Math.ceil(productLength/limitItem)

        const products=await Product.find().skip(pageSkip).limit(limitItem)
       
        if(allProduct){
            return NextResponse.json({
                success:true,
                allProduct:products,
                pageCount,
                totalProduct:productLength
            })
        }else{


            return NextResponse.json({
                success:false,
                message:'product not found'
            })

        }


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}