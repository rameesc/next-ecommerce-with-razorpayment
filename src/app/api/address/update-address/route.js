import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import { NextResponse } from "next/server";




export async function PUT(req){

    try{

        const {searchParams}=new URL(req.url);
        const addressId=searchParams.get('addressId')

        

        await connectToDB()
        const isAuth=await AuthUser(req)
        const {
            fullname,
            city,
            picCode,
            phone,
            address,
          
          }=await req.json()


        if(!isAuth.user){
            return NextResponse.json({
                success:false,
                message:'user not auth'
            })


        }

        

        const isAddress=await Address.findByIdAndUpdate(addressId,{
            fullname,
            city,
            picCode,
            phone,
            address,
            

        })

        if(!isAddress){
            return NextResponse.json({
                success:false,
                message:'address not found'
            })

        }

        return NextResponse.json({
            success:true,
            message:'succesfuly  updated'
        })



    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}