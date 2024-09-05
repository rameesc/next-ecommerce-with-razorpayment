import { connectToDB } from "@/database"
import { Product } from "@/models/productSchema"
import Joi from "joi"
import { NextResponse } from "next/server"


const addschemaProduct=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    category:Joi.string().required(),
    sizea:Joi.array().required(),
    deliveryInfo:Joi.string().required(),
    onSale:Joi.string().required(),
    priceDrop:Joi.number().required(),
    imageUrl:Joi.string().required()
})

export const PUT=async(req)=>{
    
        const user='admin'
    try{
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id')

        const {
            name,
            description,
            price,
            category,
            sizea,
             deliveryInfo,
            onSale,
            priceDrop,
            imageUrl

        }=await req.json()
     
    if(user=='admin'){

        const {error}=addschemaProduct.validate({
            name,
            description,
            price,
            category,
            sizea,
             deliveryInfo,
            onSale,
            priceDrop,
            imageUrl
        })

        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })


        }

        const updateProduct=await Product.findByIdAndUpdate(id,{
            name,
            description,
            price,
            category,
            sizea,
             deliveryInfo,
            onSale,
            priceDrop,
            imageUrl

        })

      if(updateProduct){
        return NextResponse.json({
            success:true,
            message:'succesfuly product updated'
        })


      }else{
        return NextResponse.json({
            success:false,
            message:'product not found'
        })

      }


    }else{
        return NextResponse.json({
            success:false,
            message:'this only admin router'
        })

    }

    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }

}