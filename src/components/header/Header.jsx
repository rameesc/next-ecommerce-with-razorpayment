"use client"
import React, { useEffect } from 'react'
import './header.scss'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Header = () => {
  const {userInfo}=useSelector((state)=>state.userinfo)
  useEffect(()=>{

  },[])
  return (
    <div className='header-conatiner'>
        <div className='logo'>
            <Link href={'/'}>
            <h1><span>S</span>hopping</h1>
            </Link>
        </div>
        <div className='center-item'>
            <li> <Link href={'/product'}>All Product</Link></li>
           <li><Link href={'/cart'}>{`Cart ${0}`}</Link></li>
            
        </div>
        <div className='right'>
           {userInfo?.user?
            <li><Link href={'/AccountPage'}>Account</Link></li>:
            <li><Link href={'/register'}>sing-Up</Link></li>
            }
       
         
        </div>
    </div>
  )
}

export default Header