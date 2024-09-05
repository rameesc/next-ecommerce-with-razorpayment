import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Slider } from "@/models/slider";
import { NextResponse } from "next/server";






export async function DELETE(req){

    try{
        await connectToDB()
        const isAuth=await AuthUser(req)
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id')

        if(isAuth.user.role=='admin'){

            const deleteSlider=await Slider.findByIdAndDelete(id);

            if(deleteSlider){
                return NextResponse.json({
                    success:true,
                    message:'successfuly removed'
                })
            }else{
                return NextResponse.json({
                    success:true,
                    message:'slider not found'
                })

            }

            
        }else{

            return NextResponse.json({
                success:false,
                message:'user not auth'
            })
        }



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}