import { connectToDB } from "@/database";
import { AuthUser } from "@/middleware/AuthUser";
import { Slider } from "@/models/slider";
import { NextResponse } from "next/server";





export async function PUT(req){

    try{
        await connectToDB();
        const isAuth=await AuthUser(req)
        const {searchParams}=new URL(req.url);

        const id=searchParams.get('id')

        const {
           img,
           contect,
           btnUrl,
           }=await req.json()

        if(isAuth.user.role=='admin'){

            const upDate=await Slider.findByIdAndUpdate(id,{
                img,
                contect,
                btnUrl
            })

            if(upDate){

                return NextResponse.json({
                    success:true,
                    message:'successfuly updated'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'not found'
                })

            }


        }else{

            return NextResponse.json({
                success:false,
                message:'only admin can access'
            })
        }



    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}