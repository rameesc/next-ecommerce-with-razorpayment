import { Product } from "@/models/productSchema"
import { NextResponse } from "next/server"



export const DELETE=async(req)=>{

    try{
        const user='admin'
        if(user=='admin'){

            const {searchParams}=new URL(req.url)
            const id=searchParams.get('id')

            const deleteProduct=await Product.findByIdAndDelete(id)

            if(deleteProduct){

                return NextResponse.json({
                    success:true,
                    message:'succesfuly deleted'
                })

            }else{
                return NextResponse.json({
                    success:false,
                    message:'product not found'
                })

            }
            

        }else{

            return NextResponse.json({
                success:false,
                message:'admin only can delete product'
            })

        }


    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}