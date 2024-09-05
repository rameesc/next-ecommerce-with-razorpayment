"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import './login.scss'
import { BiSolidHide } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import Spinner from '@/components/spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserdata } from '@/reduct-toolkit/userInfoSlice';
import withAuth from '@/utils/withAuth';
import Loading from '@/components/loading/Loading';

const Login = () => {
  const {userInfo,isUser}=useSelector((state)=>state.userinfo)
  const [isLoading,setIsloading]=useState(true)
  const dispatch=useDispatch()
  const pathname=usePathname()

  const [date,setData]=useState({
    email:'',
    password:''
  })
 
  const [show,setShow]=useState(false)
  const [loading,setLoading]=useState(true)
  const {email,password}=date

  const route=useRouter()
  //dispatch(fetchUserdata())
     console.log()
  useEffect(()=>{
    dispatch(fetchUserdata())&&setIsloading(false)

    //isUser?route.push('/'):route.push('/login')
  
  
   
  },[])


  const submiteHandler=async()=>{

    try{
      setLoading(false)

      const {data}=await axios.post('/api/login',{
        email,
        password
      })
      setLoading(true)
      console.log(data)
      if(data.success==true){
        setLoading(true)
        toast(data.message)
        localStorage.setItem('TOKEN',data.token)
      

        return route.push('/')

      }
     toast(data.message)


    }catch(error){
      toast(error.message)

    }

  }

  //inputHandler(e)
  const inputHandler=(e)=>{

    const {name,value}=e.target;
    setData({...date,[name]:value});

    


  }
  return (
    <div className='login-cantainer'>
      {isLoading&&<Loading/>}
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
        theme="dark"/>
      <div className='login-page'>
         <div className='login'>
          <h1>Login</h1>
         <form action="">
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
         <p>if you dont have account click here <Link href='/register'><span style={{color:'blue'}}>Register</span></Link></p>
          <button className='loginbtn' onClick={()=>submiteHandler()}>{loading?'Login':<Spinner/>}</button>
          <button className='googlebtn'>Login with Google</button>
         </div>
      </div>
    </div>
  )
}

export default Login 