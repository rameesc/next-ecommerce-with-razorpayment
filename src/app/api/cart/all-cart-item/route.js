import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import { NextResponse } from "next/server";





export async function GET(req){

    try{
      await  connectToDB()

    const isUser=await  AuthUser(req)
    

       if(!isUser.user){
        return NextResponse.json({
            success:false,
            message:'user not authenticated'
        })

       }

       const userAllCart=await Cart.find({userId:isUser.user._id})
       .populate('productId')
       .populate('userId')

       let subTotal=0

       userAllCart.map((item,index)=>{
        console.log(item)
        subTotal+=(Number(item.productId.price)-Number(item.productId.price)*Number(item.productId.priceDrop)/100)*Number(item?.quantity)
        
       })

      // const Total= itemTotal.reduce((acc,curr)=>acc+curr,0)
       console.log(subTotal)

       if(!userAllCart){
        return NextResponse.json({
            success:false,
            message:'cart not found'
        })

       }

       if(userAllCart){
        return NextResponse.json({
            success:true,
            message:'all cart',
            cart:userAllCart,
            deliveryCharge:50,
            subTotal:subTotal
        })

       }


    }catch(error){

        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}