"use client"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect } from "react"



 const withAuth=(WrappedComponent)=>{
  
    return (props)=>{

       // const router=useRouter();

       const token=localStorage.getItem('TOKEN')
        useEffect(()=>{
           
            if(token){
                redirect('/')
              
              
    
            }
           

        },[])
        if(token){
         return   redirect('/')
          
          

        }
       

        return <WrappedComponent {...props}/>


    }

}
export default withAuth;