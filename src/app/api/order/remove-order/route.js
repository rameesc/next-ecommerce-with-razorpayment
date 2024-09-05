import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Order } from "@/models/order";
import { NextResponse } from "next/server";




export async function DELETE(req){

    try{
       const {searchParams}=new URL(req.url)
       const orderId=searchParams.get('orderId')



        await connectToDB()
        const isAuth=await AuthUser(req);


        if(!isAuth.user){

            return NextResponse.json({
                success:false,
                message:'user not auth'
            })
        }

        const isOrder=await Order.findByIdAndDelete(orderId)

        if(!isOrder){


            return NextResponse.json({
                success:false,
                message:'order not found'
            })
        }


        return NextResponse.json({
            success:true,
           message:'succesfuly removed'
        })






    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}