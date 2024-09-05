'use client'
import React, { useEffect } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItem } from '@/reduct-toolkit/getAllCart'
import Loading from '@/components/loading/Loading'
import { priceDisco } from '@/utils/cardLogic'
import { space } from 'postcss/lib/list'
import { useRouter } from 'next/navigation'
import withAuth from '@/utils/withAuth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { fetchUserdata } from '@/reduct-toolkit/userInfoSlice'
import Link from 'next/link'


const Cart = () => {
 const {cart,deliveryCharge,loading,subTotal}= useSelector((state)=>state.cart)
 const {userInfo}=useSelector((state)=>state.userinfo)

  const dispatch=useDispatch()
  const route=useRouter()

  useEffect(()=>{
    dispatch(fetchCartItem())
   
    //userInfo?route.push('/cart'):route.push('/login')

  },[])

  //removefromCart

  const removefromCart=async(id)=>{
   
    try{
      const {data}=await axios.delete(`/api/cart/remove-from-cart?id=${id}`)
      if(data.success){
        toast(data.message)
        dispatch(fetchCartItem())
      }
      toast(data.message)


    }catch(err){
      console.log(err.message)
    }

  }

  return (
    <div>
      {/* {loading&&<Loading/>} */}
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
       <div className='cartt-container'>

        <div className='cart-item'>
         {cart&&cart?.map((item,index)=>(
         
            <div className='cart-left'>
              <div className='field'>
                <h2>#</h2>
                <span>{index+1}</span>
               
              </div>
              <div className='field'>
                <h2>img</h2>
               
                <img src={item?.productId?.imageUrl} alt="" />
              </div>
              <div className='field'>
                <h2>name</h2>
               
               <span>{item?.productId?.name}</span>
              </div>
              <div className='field'>
                <h2>price</h2>
               
               <span>{priceDisco(item?.productId?.price,item?.productId?.priceDrop)}</span>
              </div>
              <div className='field'>
                <h2>size</h2>
               {item?.productId?.sizea?.map((item,index)=>(
                <span>{item}</span>
               ))}
               
              </div>
              <div className='field'>
              <h2>oty</h2>
                <button>-</button>
                <span>{item?.quantity}</span>
                <button>+</button>
               
               
              </div>
              <div className='field'>
                <button onClick={()=>removefromCart(item?._id)} className='delete'>Delete</button>
            
               
               
              </div>
            </div>
          

         
              ))}
       
        </div>
         <div className='cart-right'>
          <div className='cart'>
            <h1>SubTotal</h1>
            <table>
              <thead>
                <tr>
                  <td>no</td>
                  <td>name</td>
                  <td>price</td>
                  <td>qty</td>
                  <td>total</td>
                </tr>
              </thead>
              <tbody>
                {cart&&cart?.map((item,index)=>(
                  <tr>
                    <td>{index+1}</td>
                    <td>{item?.productId?.name}</td>
                    <td>{priceDisco(item?.productId?.price,item?.productId?.priceDrop)}</td>
                    <td>{item?.quantity}</td>
                    <td style={{color:'red'}}>{Number(priceDisco(item?.productId?.price,item?.productId?.priceDrop)*Number(item?.quantity))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>{`SubTotal=${subTotal}`}</h1>
            <button className='place-order'><Link href={'/useAddres'}>place order</Link></button>

          </div>
         </div>

        
      </div>
    </div>
  )
}

export default Cart