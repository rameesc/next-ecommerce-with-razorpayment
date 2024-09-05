import JWT from 'jsonwebtoken'
import { NextResponse } from 'next/server'


export const AuthUser=async(req)=>{
     
    try{
        const token=req.headers.get('Authorization').split(' ')[1]
        
        if(!token){
            // return NextResponse.json({
            //     success:false,
            //     message:'token not found'
            // })
          
            return NextResponse.redirect(new URL('/login'),req.nextUrl)
            

        }
        const tokenExract=JWT.verify(token,process.env.TOKEN_SECRECT)

        if(tokenExract){
            
            return tokenExract
        }else{
            return NextResponse.json({
                success:false,
                message:'token not found'
            })
        }


    }catch(err){
        return NextResponse.json({
            success:false,
            message:err.message
        })
    }
}