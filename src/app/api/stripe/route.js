import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { NextResponse } from "next/server";


const stripe=require('stripe') (process.env.STRIPE_SECRECT_KEY)


export async function POST(req){

    try{
        await connectToDB()
        const isAuth=await AuthUser(req)

        if(!isAuth.user){
            return NextResponse.json({
                success:false,
                message:'user not auth'
            })
        }

        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:res,
            mode:"payment",
            success_url:'http://localhost:3000/checkout'+'?status=success',
            cancel_url:'http://localhost:3000/checkout'+'?status=cancel'

        })

        return NextResponse.json({
            success:true,
            id:session.id
        })


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}