import { connectToDB } from "@/database";
import { User } from "@/models/userModels";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken'



const schema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})


export async function POST(req){
    await connectToDB()

    const {email,password}=await req.json()
    const {error}=schema.validate({email,password})

    if(!email||!password){
        return NextResponse.json({
            success:false,
            message:'please fill input'
        })
    }

    if(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }

    

   
    try{
        const isuserExist=await User.findOne({email})
        if(!isuserExist){
            return NextResponse.json({
                success:false,
                message:'user not found please create Account'
            })
        }
        //check password
         const checkPassword=await compare(password,isuserExist.password)
         if(!checkPassword){
            return NextResponse.json({
                success:false,
                message:'password not macth. Please try again'
            })
         }
         const isuser=await User.findOne({email}).select('-password')
         //create token
         const createToken=JWT.sign({user:isuser},process.env.TOKEN_SECRECT)

         return  NextResponse.json({
            success:true,
            token:createToken
         })



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}