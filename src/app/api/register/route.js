import { connectToDB } from "@/database";
import { User } from "@/models/userModels";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";


const schema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    
})

export const dynamic='force-dynamic';


export async function POST(req){
  
    await  connectToDB()
    
   const {name,email,password,role}=await req.json()
   
   
   //validate the schema
   const {error}=schema.validate({name,email,password})

   if(error){
    return NextResponse.json({
        success:false,
        message:error.message
    })

   }

   try{
    const isUser=await User.findOne({email})

     if(isUser){
        return NextResponse.json({
            success:false,
            message:'user already exist'
        })
     }

     //hash password
     const hashPassword=await hash(password,10)
      //create user

      const newUser=await User.create({
        name,
        password:hashPassword,
        email,
        role
      })

      if(newUser){
        return NextResponse.json({
            success:true,
            message:'Account cteated successfuly'
        })
      }




   }catch(error){
    return NextResponse.json({
        success:false,
        message:error.message
    })
   }


}