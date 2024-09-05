import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import { NextResponse } from "next/server";






export async function DELETE(req){

    try{
        const {searchParams}=new URL(req.url)
        const addressId=searchParams.get('addressId')
        await connectToDB()
        const isAuth=await AuthUser(req)

        if(!isAuth.user){

            return NextResponse.json({
                success:false,
                message:'user not auth'
            })
        }


        const isAddress=await Address.findOne({$and:[{userId:isAuth.user._id},{_id:addressId}]})

        if(!isAddress){
            return NextResponse.json({
                success:false,
                message:'address and user not match'
            })


        }
        const removeAddress=await Address.findByIdAndDelete(isAddress._id)

        if(removeAddress){
            return NextResponse.json({
                success:true,
                message:'address removed '
            })

        }else{
            return NextResponse.json({
                success:false,
                message:'address not found'
            })

        }
        




    }catch(error){

        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}