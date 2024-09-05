import React from 'react'
import './footer.scss'
import Link from 'next/link'
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-top'>


        <Link href={'/'}>
        <h1><span>S</span>hopping</h1>
        </Link>
      </div>
      <div className='footer-center'>
        <div className='item'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Atque velit molestias totam obcaecati officiis, ea sunt itaque 
            sed deleniti? Provident 
            hic perferendis aspernatur accusantium a vitae ab ut. Minus, vero!</p>
        </div>
        <div className='item'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Atque velit molestias totam obcaecati officiis, ea sunt itaque 
            sed deleniti? Provident 
            hic perferendis aspernatur accusantium a vitae ab ut. Minus, vero!</p>
        </div>
        <div className='item'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Atque velit molestias totam obcaecati officiis, ea sunt itaque 
            sed deleniti? Provident 
            hic perferendis aspernatur accusantium a vitae ab ut. Minus, vero!</p>
        </div>
      </div>
      <div className='footer-buttom'>
        <div className='icons'>
          <div className='icon'>
            <FaWhatsapp/>
          </div>
          <div className='icon'>
            <CiFacebook/>

          </div>
          <div className='icon'>
           
            <FaInstagram/>

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Footer