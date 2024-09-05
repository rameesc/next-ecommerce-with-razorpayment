"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import '../login/login.scss'
import { BiSolidHide } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Spinner from '@/components/spinner/Spinner';

const Register = () => {
  const [date,setData]=useState({
    email:'',
    password:'',
    name:''
  })

  const router = useRouter()

  const [show,setShow]=useState(false)
  const [loading,setLoading]=useState(true)

  const {email,password,name}=date


  const submiteHandler=async()=>{

    try{
      setLoading(false)
      const {data}=await axios.post('/api/register',{
        name,
        email,
        password
      })
      setLoading(true)

      if(data?.success==true){
        setLoading(true)
        toast(data?.message)

        return  router.push('/login')
      }
      toast(data?.message)
     


    }catch(err){
      toast(err.message)

    }
   
    

  }

  //inputHandler(e)
  const inputHandler=(e)=>{
    const {name,value}=e.target;
    setData({...date,[name]:value})

  }
  return (
    <div className='login-cantainer'>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
       
      
      />
      <div className='login-page'>
         <div className='login'>
          <h1>Create Account</h1>
         <form action="" >
         <div className='field'>
            <label htmlFor="">Name</label>
            
            <input type="text" name='name' value={name} onChange={(e)=>inputHandler(e)} />
            
          </div>
          <div className='field'>
            <label htmlFor="">Email</label>
            
            <input type="text" name='email' value={email} onChange={(e)=>inputHandler(e)} />
            
          </div>
          <div className='field'>
            <label htmlFor="">Password</label>
            <input type={show?"text":"password"} name='password' value={password} onChange={(e)=>inputHandler(e)} />
            <p onClick={()=>setShow(!show)}>{show?<HiOutlineEye/>:<BiSolidHide/>}</p>

          </div>
         
         </form>
         <p>if you have account click here <Link href='/login'><span style={{color:'blue'}}>Login</span></Link></p>
          <button  className='loginbtn' onClick={()=>submiteHandler()}>{loading?'Create Account': <Spinner/>}</button>
          <button className='googlebtn'>Login with Google</button>
         
         </div>
      </div>
    </div>
  )
}



export default Register