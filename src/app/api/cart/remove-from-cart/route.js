import { Cart } from "@/models/cart";
import { NextResponse } from "next/server";




export async function DELETE(req){


    try{
        const {searchParams}=new URL (req.url)

        const id=searchParams.get('id')
        console.log(id)

        if(!id){
            return NextResponse.json({
                success:false,
                message:'cart id not found'
            })

        }
        const isCart=await Cart.findByIdAndDelete(id)

        if(isCart){
            return NextResponse.json({
                success:true,
                message:'cart item succesfuly removed'
            })


        }else{

            return NextResponse.json({
                success:false,
                message:'cart  not found'
            })
        }
        



    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }

}