import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import { NextResponse } from "next/server";





export async function GET(req){

    try{
        await connectToDB();
        const isUser=await AuthUser(req);


        if(!isUser.user){
            return NextResponse.json({
                success:false,
                message:'user not auth'
            })

        }

        const isAddres=await Address.find({userId:isUser.user._id})
           .populate('userId')

        if(!isAddres){
            return NextResponse.json({
                success:false,
                message:'address not found'
            })


        }

        return NextResponse.json({
            success:true,
            address:isAddres

        })



    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}