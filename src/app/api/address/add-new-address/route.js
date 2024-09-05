import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Address } from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";


const newAddres=Joi.object({
    fullname:Joi.string().required(),
    city:Joi.string().required(),
    pinCode:Joi.number().required(),
    phone:Joi.number().required(),
    address:Joi.string().required(),
    userId:Joi.string().required(),

})

export async function POST(req){

    try{
        await connectToDB()
       const isUser= await AuthUser(req)

       if(!isUser.user){
         return NextResponse.json({
            success:false,
            message:'user not auth'
         })
       }

       const {
        fullname,
        city,
        pinCode,
        phone,
        address,
        userId
       }=await req.json()

       const {error}=newAddres.validate({
        fullname,
        city,
        pinCode,
        phone,
        address,
        userId:isUser.user._id
       })

       if(error){
         return NextResponse.json({
            success:false,
            message:error.details[0].message
         })

       }

       //cerate Address
       const createNew=await Address.create({
        fullname,
        city,
        pinCode,
        phone,
        address,
        userId:isUser.user._id
       })

       if(createNew){
        return NextResponse.json({
            success:true,
            message:'address succesfuly added'
        })


       }else{
        return NextResponse.json({
            success:false,
            message:'something error'
        })

       }


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}