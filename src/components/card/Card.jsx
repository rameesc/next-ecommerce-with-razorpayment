import React from 'react'
import './card.scss'
import { descriptionLength, priceDisco } from '@/utils/cardLogic'
import Link from 'next/link'
import { axioss } from '@/utils/axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Card = ({
  description,
  price,
  category,
  priceDrop,
  img,
  id
}) => {


  const addtoCart=async(id)=>{

    try{
      const {data}=await axios.post(`/api/cart/add-to-cart`,{
        productId:`${id}`,
        quantity:1
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
        }
      })

      if(data.success){
       return toast(data.message)

      }
      toast(data.message)


    }catch(error){
      console.log(error)
    }

  }



  return (
    <div className='cart-container'>
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
      <div className='cart'>
        <div className='top-cart'>
          <img src={img} alt='img' />
        </div>
        <div className='cart-center'>
          <div className='price-discound'>
            <div className='price-trow'>
             <p>${price}</p>
             <p>${priceDisco(price,priceDrop)}</p>
            </div>
            <p className='discond'>{priceDrop}%</p>
          </div>
          <p className='description'>{descriptionLength(description)}</p>
        </div>
        <div className='card-buttom'>
        <button onClick={()=>addtoCart(id)} >Add to Cart</button>
        <Link href={`/singleProduct/${id}`}>
        <button className='views'>View to product</button>
        </Link>
          
        </div>
         
      </div>

    </div>
  )
}

export default Card