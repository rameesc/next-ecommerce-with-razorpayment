import { connectToDB } from '@/database'
import { AuthUser } from '@/middleware/AuthUser'
import { Cart } from '@/models/cart'
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'


const instance=new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRECT
})

//mobile payment


export async function POST(req){
    try{
        await connectToDB()
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
       //total amount

    let subTotal=0
   

    cartItem.map(async(item,index)=>{
        subTotal+=item.quantity*item.productId.price
       
    })

    const orderOption={
        userId:isAuth.user._id,
        orderItems:cartItem.map((item)=>({
            qty:item.quantity,
            product:item.productId._id
        })),
        shippingAddres:shippingAddress,
        paymentMethod:paymentMethod,
        totalPrice:subTotal,
        isProcessing:false,
        paidAt:Date.now()
        
    }

    //option
    const option={
        amount:Number(subTotal)*100,
        currency:'INR'
    }

    //order
    const order=await instance.orders.create(option)

    return NextResponse.json({
        success:true,
        order,
        orderOption
    })


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}

