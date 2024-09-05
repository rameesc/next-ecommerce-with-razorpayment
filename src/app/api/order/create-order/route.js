import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import { Order } from "@/models/order";
import { Product } from "@/models/productSchema";
import { NextResponse } from "next/server";



//cash on delivery
export async function POST(req){

    try{
        await connectToDB();
        const isAuth=await AuthUser(req)

        if(!isAuth.user){

            return NextResponse.json({
                success:false,
                message:'user not auth'
            })
        }
        const {
            userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid
        }=await req.json()

        const cartItem=await Cart.find({userId:isAuth.user._id})
        .populate('productId')
        

        if(cartItem==''||cartItem==[]||cartItem==undefined){
            return NextResponse.json({
                success:false,
                message:'cart not found'
            })
    
    
           }

        let subTotal=0
       

        cartItem.map(async(item,index)=>{
            subTotal+=item.quantity*item.productId.price
           
        })
       
        
       


       



        const createOrder=await Order.create({
            userId:isAuth.user._id,
            orderItems:cartItem.map((item)=>({
                qty:item.quantity,
                product:item.productId._id
            })),
            shippingAddress,
            totalPrice:subTotal,
            paymentMethod,
            isPaid:false,
            isProcessing:false,
            paidAt:Date.now()

        })

       


        if(createOrder){
             ///after order remove all cart from cart
            await Cart.deleteMany({userId:isAuth.user._id})
            return NextResponse.json({
                success:true,
                message:'succesfuly order'
            })

        }else{
             ///after order remove all cart from cart
             await Cart.deleteMany({userId:isAuth.user._id})
            return NextResponse.json({
                success:false,
                message:'something wrong'
            })

        }

        
    


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}
