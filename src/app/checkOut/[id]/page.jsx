"use client"
import React, { useEffect, useState } from 'react'
import './checkOut.scss'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { fetchCartItem } from '@/reduct-toolkit/getAllCart'
import { priceDisco } from '@/utils/cardLogic'
import { useRouter } from 'next/navigation'
import { fetchUserdata } from '@/reduct-toolkit/userInfoSlice'
import Razorpay from 'razorpay'
import Script from 'next/script';

const CheckOut = ({params}) => {
  const [address,setAddress]=useState()
  const [paymentMethod,setPaymetMethod]=useState('')

  //router
  const router=useRouter()

  //cart items
  const {cart,deliveryCharge,loading,subTotal}= useSelector((state)=>state.cart)
  const {userInfo}=useSelector((state)=>state.userinfo)
  //useDispatch
  const dispatch=useDispatch()

  //user addrees
  const fetchUserAddress=async()=>{
    try{

      const {data}=await axios(`/api/address/single-address?id=${params?.id}`)
      if(data.success){
        setAddress(data.isAddress)
        
      }
    }catch(error){
      console.log(error.message)
    }


  }
 

  useEffect(()=>{
    fetchUserAddress()
    dispatch(fetchCartItem())
    dispatch(fetchUserdata())

  },[])


  //orderPayment()

  

  //mobile payment
  const mobilePayment=async()=>{

     try{
      const {data:{orderOption,order}}=await axios.post(`/api/order/mobile-payment`,{
        shippingAddress:params?._id,
        paymentMethod:paymentMethod
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
        }
      })
      

    
        //initialize razarpay
       
        const options = {
          key:process.env.PUBLIC_RAZORPAY_KEY_ID , // Enter the Key ID generated from the Dashboard
          amount: orderOption?.totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp", //your business name
          description: "Test Transaction",
          order_id: order?.id,
          image: "https://example.com/your_logo",
          // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response){
            const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=response

            const {data}=await axios.post(`/api/order/payment-veriry`,{
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOption:orderOption

            },{
              headers:{
                Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
              }
            })
            console.log(data)
            
            if(data.success){
              return router.push('/payment-succes')
            }else{
              return router.push('/payment-feild')

            }
             
          },
          prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              name: userInfo?.user?.name, //your customer's name
              email: userInfo?.user?.email
               //Provide the customer's phone number for better conversion rates 
          },
         
          theme: {
              color: "#3399cc"
          }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      

        
      


     }catch(error){
      console.log(error)
     }

  }

  //cash on delivery
  const  cashOnDelivery=async()=>{
   
    try{
      const {data}=await axios.post(`/api/order/create-order`,{
        paymentMethod:paymentMethod,
        shippingAddress:params?.id
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
        }
      })
      console.log(data)
      if(data.success){
       return router.push('/payment-succes')


      }else{
        return router.push('/payment-feild')


      }


    }catch(error){
      console.log(error)
    }

  }

  //
  return (
    <>
    <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"/>
  
    
    
    <div className='order-container'>

      <div className='address-to-delivery'>
        <div className='address'>
          <h1>Delivery To This Address</h1>

           <div className='field'>
            <label htmlFor="">Full name</label>
            <p>{address?.fullname}</p>
           </div>
           <div className='field'>
            <label htmlFor="">city</label>
            <p>{address?.city}</p>
           </div>
           <div className='field'>
          


            <label htmlFor=""> pinCode</label>
            <p>{address?.pinCode}</p>
           </div>
           <div className='field'>
            <label htmlFor="">phone</label>
            <p>{address?.phone}</p>
           </div>
           <div className='field'>
            <label htmlFor="">Address</label>
            <p>{address?.address}</p>
           </div>
        </div>
        <div className='orders'>
          <h1>product Items</h1>

          
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
            <h1>{`SubTotal=$`}<span>{subTotal}</span></h1>
            

         
        </div>
        <div className='payemt-method'>
          <h1>Payment Method</h1>
          <div className='field'>
            <label>Cash on delivery</label>
            <input type='radio' name='cash' onClick={(e)=>setPaymetMethod('Cash on delivery')}  />
          
            
           
          </div>
          <div className='field'>
            <label >mobile payment</label>
            <input type='radio' name='cash' onClick={(e)=>setPaymetMethod('mobile payment')}   />
          </div>
        </div>
        <div className='check-out'>
          <button onClick={()=>paymentMethod=='Cash on delivery'? cashOnDelivery():mobilePayment()}>Check Out</button>
        </div>
      </div>
    </div>
  </>
  )
}

export default CheckOut