import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
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
        }else{

            return NextResponse.json({
                success:true,
                user:isAuth.user
            })
        }



    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}