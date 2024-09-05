import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Product } from "@/models/productSchema";
import { User } from "@/models/userModels";
import {Cart} from '@/models/cart'
import Joi from "joi";
import { NextResponse } from "next/server";


const addTocart=Joi.object({
    // userId:Joi.string().required(),
    productId:Joi.string().required(),
    quantity:Joi.number().required()
})


export async function POST(req){

    try{
        await connectToDB()

        const isAuthUser=await AuthUser(req)

        console.log(isAuthUser.user._id)


        if(!isAuthUser.user){

            return NextResponse.json({
                success:false,
                message:'user not authonticated'
            })

            

        }

        const {
           // userId,
            quantity,
            productId
        }=await req.json()

        const {error}=addTocart.validate({
           // userId,
            quantity,
            productId
        })

        if(error){
            return NextResponse.json({
                success:'u',
                message:error.details[0].message
            })

        }

        const isUser=await User.findById(isAuthUser.user._id)
        const isProduct=await Product.findById(productId)

        if(!isUser){
            return NextResponse.json({
                success:false,
                message:'user not found'
            })

        }

        if(!isProduct){
            return NextResponse.json({
                success:false,
                message:'product not found'
            })


        }
        const isCart=await Cart.findOne({productId})

        if(isCart){

            if(isCart.quantity>=4){
                isCart.quantity=4

               await isCart.save()
               return NextResponse.json({
                success:false,
                message:'only 4 item can added to cart'
             })

            }
            isCart.quantity++

            await isCart.save()
            return NextResponse.json({
                success:false,
                message:'add to cart'
            })

        }

        const addToCart=await Cart.create({
            userId:isAuthUser.user._id,
            productId,
            quantity
        })

        if(addToCart){
            return NextResponse.json({
                success:true,
                message:'succesfuly added'
            })

        }


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}