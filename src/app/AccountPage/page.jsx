'use client'

import React, { useEffect, useState } from 'react'
import './account.scss'
import { fetchUserdata } from '@/reduct-toolkit/userInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { dateTimeFormatte } from '@/utils/cardLogic'

const Account = () => {

  // order data

  const [orders,setOrders]=useState([])

  //dispatch
  const dispatch=useDispatch()

  //use dataa
  const {userInfo}=useSelector((state)=>state.userinfo)


  //fetch user Order

  const fetchUserOrders=async()=>{

    try{
      const {data}=await axios.get(`/api/order/get-all-order`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
        }
      })

      if(data.success){
        setOrders(data?.orderItem)


      }


    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    dispatch(fetchUserdata())
    fetchUserOrders()

  },[])
  console.log(userInfo)
  console.log(orders)

  
  return (
    <div className='account-container'>
      <div className='userinfo-admin'>
        <img src="" alt="img" />
        <div className='field'>
          <label htmlFor="">Name</label>
          <h1>{userInfo?.user?.name}</h1>
        </div>
        <div className='field'>
          <label htmlFor="">Email</label>
          <h1>{userInfo?.user?.email}</h1>
        </div>
        {userInfo?.user?.role=='admin'&& <button>Admin Pennal</button> }
        
      </div>
      <div className='user-all-orders'>
        <h1>Orders</h1>
        {orders.length>0?
         orders.map((item,index)=>{
          return(
            <div className='orders'>
              <div className='date'>
                <h1>{`Date-${dateTimeFormatte(item?.paidAt,'date')}`}</h1>
                <h1>{`Time-${dateTimeFormatte(item?.paidAt,'time')}`}</h1>
              </div>
              <div className='payment'>
                <h1>paymet method</h1>
                <p>{item?.paymentMethod}</p>
               
              </div>
              <div className='bill'>
                <h1>Total Amout</h1>
                <p>{item?.totalPrice}</p>
              </div>
              <div className='delivery'>
                <h1>Delivery address</h1>
                <p><span>name</span>{item?.shippingAddress?.fullname}</p>
                <p><span>city</span>{item?.shippingAddress?.city}</p>
                <p><span>Address</span>{item?.shippingAddress?.address}</p>
                <p><span>pincode</span>{item?.shippingAddress?.pincode}</p>
                <p><span>phone</span>{item?.shippingAddress?.phone}</p>
              </div>
              <div className='order-items'>
                {item?.orderItems?.map((item,index)=>{
                  return(
                    <table>
                      <thead>
                        <tr>
                          <td>#</td>
                          <td>product</td>
                          <td>img</td>
                          <td>oty</td>
                          <td>price</td>
                          <td>status</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{index+1}</td>
                          <td>{item?.product?.name}</td>
                          <td><img src={item?.product?.imageUrl} alt="" /></td>
                          <td>{item?.oty}</td>
                          <td>{item?.product?.price}</td>
                          <td style={{color:item?.product?.isProcessing?'green':'red',fontWeight:'bold'}}>{item?.product?.isProcessing?'delivered':'processing'}</td>
                        </tr>
                      </tbody>
                    </table>
                  )
                })}
              </div>
            </div>
          )

         }):(
          <div className='no-orders'>
            <h1>no Orders yet</h1>
          </div>
         )}

        

      </div>

    </div>
  )
}

export default Account