"use client"
import MostSelling from '@/components/most-selling/MostSelling'
import Slider from '@/components/slider/Slider'
import { fetchUserdata } from '@/reduct-toolkit/userInfoSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const page = () => {


  const dispatch=useDispatch()
  const {userInfo,loading,message}=useSelector((state)=>state.userinfo)
const route=useRouter()
  console.log(userInfo)
  

  useEffect(()=>{
   // dispatch(fetchUserdata())

    // if(!userInfo){
    // return  route.push('/login')

    // }else{
    //   return  route.push('/')
    // }

  },[])
  return (
    <div>
      <Slider/>
      <MostSelling/>
    </div>
  )
}

export default page


