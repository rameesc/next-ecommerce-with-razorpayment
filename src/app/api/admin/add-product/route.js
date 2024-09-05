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

export const POST=async(req)=>{
    const user='admin'
    try{

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
                    message:error.message
                })
    

            }

            const addProduct=await Product.create({
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

            if(addProduct){
                return NextResponse.json({
                    success:false,
                    message:'product succesfuly added'
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

