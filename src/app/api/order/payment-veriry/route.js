import { NextResponse } from "next/server"
import Razorpay from "razorpay";
import crypto from 'crypto'
import { Order } from "@/models/order";
import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";

const instance=new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRECT
})




export const POST=async(req)=>{

    try{
        await connectToDB()
       const isAuth= await AuthUser(req)

       if(!isAuth){

        return NextResponse.json({
            success:false,
            message:'user not auth'
        })
       }
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderOption,
        }=await req.json();

        const body=razorpay_order_id+"|"+razorpay_payment_id;
       const expectedSignature=crypto.createHmac(
            "sha256",process.env.KEY_SECRECT
        ).update(body).digest('hex')

        const isAuthentic=expectedSignature===razorpay_signature
        console.log(orderOption,1000)
        if(isAuthentic){
            console.log(orderOption,2000)
            const order=await Order.create({
               userId:orderOption.userId,
               orderItems:orderOption.orderItems,
               totalPrice:orderOption.totalPrice,
               shippingAddres:orderOption.shippingAddress,
               isProcessing:orderOption.isProcessing,
               paidAt:orderOption.paidAt
            })
           

            if(order){
                ///after order remove all cart from cart
               await Cart.deleteMany({userId:isAuth.user._id})
               return NextResponse.json({
                   success:true,
                   message:'succesfuly order'
               })
   
           }else{
                ///after order remove all cart from cart
                await Cart.deleteMany({userId:isAuth.user._id})
               return NextResponse.json({
                   success:false,
                   message:'something wrong'
               })
   
           }


        }


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}