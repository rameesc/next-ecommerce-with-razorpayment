import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Order } from "@/models/order";
import { NextResponse } from "next/server";







export async function GET(req){

    try{
        await connectToDB();
        const isAuth=await AuthUser(req)


        if(!isAuth.user){
            return NextResponse.json({
                success:false,
                message:'user not auth'
            })
        }

        const orderItem=await Order.find({userId:isAuth.user._id})
        .populate('shippingAddress')
        .populate('orderItems.product')

        if(orderItem){
            return NextResponse.json({
                success:true,
                orderItem
            })

        }



    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}