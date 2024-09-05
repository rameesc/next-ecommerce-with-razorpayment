import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Cart } from "@/models/cart";
import { NextResponse } from "next/server";






export async function PUT(req){

    try{
        await connectToDB()
        const isAuth=await AuthUser(req)

        const {searchParams}=new URL(req.url)
        const action=searchParams.get('action')
        const id=searchParams.get('id')
        

        if(!isAuth.user){
            return NextResponse.json({
                success:false,
                message:'user not auth'
            })

        }


        const isCart=await Cart.findById(id);

        if(!isCart){
            return NextResponse.json({
                success:false,
                message:'cart not found'
            })


        }
        if(action=='dec'){
            if(isCart.quantity<=1){
              isCart.quantity=1

              return NextResponse.json({
                success:true,
                message:"updated 1"
              })
            }else{
                isCart.quantity--
               await isCart.save()
                return NextResponse.json({
                    success:true,
                    message:"updated"
                  })
            }
        }
        if(action=='inc'){
            if(isCart.quantity>=4){
                isCart.quantity=4
             await isCart.save()
              return NextResponse.json({
                success:true,
                message:"updated,you will get only 4 items"
              })
            }else{
                isCart.quantity++
                await isCart.save()
                return NextResponse.json({
                    success:true,
                    message:"updated"
                  })
            }
        }




    }catch(error){

        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}