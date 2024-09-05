const { connectToDB } = require("@/database");
const { Address } = require("@/models/address");
const { NextResponse } = require("next/server");





export const GET=async(req)=>{

    try{
      const {searchParams}=  new URL(req.url)
      const addressId=searchParams.get('id')

      if(!addressId){
        return NextResponse.json({
            success:false,
            message:'id not found'
        })
      }

      const isAddress=await Address.findById(addressId)

      if(!isAddress){
        return NextResponse.json({
            success:false,
            message:'addressnot found'
        })

      }

      return NextResponse.json({
        success:true,
        isAddress
      })



    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message

        })
    }
}