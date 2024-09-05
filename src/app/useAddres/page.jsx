'use client'

import React, { useEffect, useState } from 'react'
import './useaddress.scss'
import axios from 'axios'
import CreateAddress from '@/components/createAddress/CreateAddress'
import Link from 'next/link'

const UseAddress = () => {
    const [addres,setAddress]=useState([])
    const [createAddress,setCreateAddress]=useState(false)

    //get user address

    const fetchUserAdders=async()=>{
        try{
            const {data}=await axios.get(`/api/address/get-all-address`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
                }
            })
           
            if(data?.success){
                setAddress(data?.address)
            }



        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUserAdders()

    },[])
   console.log(addres)
  return (
    <div className='address-container'>
        <div className='header'>
            <h1>delivery Address</h1>
        </div>
   
        <div className='address-collection'>
            {/* collection  of the address*/}
            <div className='all-address'>
             {addres.length>0?(
                // address
                // : 
                // "newyork"
                // city
                // : 
                // "malappuram"
                // fullname
                // : 
                // "ramees"
                // phone
                // : 
                // 123456789
                // pinCode
                addres?.map((item,index)=>{
                    return(
                        <div className='address'>
                            <h1>#</h1>
                            <h1>{index+1}</h1>
                            <h1><span>Address</span>={item.address}</h1>
                            <h1><span>city</span>={item.city}</h1>
                            <h1><span>fullname</span>={item.fullname}</h1>
                            <h1><span>phone</span>={item.phone}</h1>
                            <h1><span>PIN CONDE</span>={item.pinCode}</h1>
                            <div className='btn'>
                                <button>Edite</button>
                                <button><Link href={`/checkOut/${item._id}`}>Delivert To this</Link></button>
                            </div>


                        </div>
                    )

                })
             ):(
                <div className='not-found'>
                    <h1>Address not create yet</h1>
                </div>
             )}

            </div>
            
            {/*create new adderes*/}
            <div className='create-address-btn'>
                <button onClick={()=>setCreateAddress((pre)=>!pre)}>Create New Delivery Address</button>
            </div>

        </div>
        <div className='create-add'>
         {createAddress && <CreateAddress setCreateAddress={setCreateAddress}/>}
        </div>
    </div>
  )
}

export default UseAddress