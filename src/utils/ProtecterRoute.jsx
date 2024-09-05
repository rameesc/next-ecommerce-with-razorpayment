'use client'
import { fetchUserdata } from '@/reduct-toolkit/userInfoSlice'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'



const ProtecterRoute = ({children}) => {
    const {userInfo,isUser}=useSelector((state)=>state.userinfo)
    const dispatch=useDispatch()
       const params=useParams()
       const pathname=usePathname()
       console.log(pathname)
      
    const route=useRouter()
    const protecterRouter=['/cart','/AccountPage','/login']
console.log(userInfo)
    useEffect(()=>{
        dispatch(fetchUserdata())
       //userInfo?.user?.role?route.push(pathname):route.push(pathname)
       console.log(userInfo?.user)
       //protecterRouter.includes(pathname)
       
        // if(isUser&&protecterRouter.includes(pathname)){
        //     return  route.push('/login')
        // }

       
      // return  route.push('/login')
       
    },[pathname])

    return children
 
}

export default ProtecterRoute