import { AuthUser } from "@/middleware/AuthUser"
import { Product } from "@/models/productSchema"
import { NextResponse } from "next/server"








export const GET=async(req)=>{


    try{
        const user='admin'
      const isAuth= await  AuthUser(req)
      console.log(isAuth,200)


        if(isAuth.user.role=='admin'){

            const product=await Product.find()

            
            

            if(product){
                return NextResponse.json({
                    success:true,
                    message:product
                })

            }else{
                return NextResponse.json({
                    success:true,
                    message:product
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