import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Slider } from "@/models/slider";
import Joi from "joi";
import { NextResponse } from "next/server";


const sliderSchema=Joi.object({
    img:Joi.string().required(),
    content:Joi.string().required(),
    btnUrl:Joi.string().required(),
})



export async function POST(req){
    try{
        await connectToDB();
        const isAuth=await AuthUser(req)

        const {
            img,
            content,
            btnUrl
        }=await req.json()




        if(isAuth.user?.role=='admin'){

            const {error}=sliderSchema.validate({
                img,
                content,
                btnUrl
            })

            if(error){
                return NextResponse.json({
                    success:true,
                    message:error.details[0].message
                })
            }

            const createSlide=await Slider.create({
                img,
                content,
                btnUrl
            })

            if(createSlide){
                return NextResponse.json({
                    success:true,
                    message:'succesfult added'
                })

                
            }else{
                return NextResponse.json({
                    success:false,
                    message:'field to add slider'
                })
            }




        }else{

            return NextResponse.json({
                success:false,
                message:'only admin can access this route'
            })
        }



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}