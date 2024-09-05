import { NextRequest, NextResponse } from "next/server"

NextRequest

export function middleware(req){
    console.log(req.nextauth)
   
    
    
    // const isPablicPath=path=='/cart'

    // if(isPablicPath){
    //     return NextResponse.redirect(new URL('/',req.nextUrl))

    // }


}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
    //matcher: ['/cart'],
  }