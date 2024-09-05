"use client"
import React, { useEffect, useState } from 'react'
import './mostselling.scss'
import axios from 'axios'
import Card from '../card/Card'

const MostSelling = () => {

    const [mostselling,SetmostSelling]=useState([])
      
 
    const fetchMostSellingproduct=async()=>{

        try{
            const {data}=await axios.get('/api/product/most-selling')

            if(data.success){
                SetmostSelling(data.mostSelling)
            }


        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchMostSellingproduct()

    },[])

  return (
    <div className='most-selling-product'>
        <div className='most-selling'>
            <h1>Most Selling Products</h1>
            <div className='product-container'>
               {mostselling?.map((item,index)=>{
                   return <Card 
                   img={item?.imageUrl} 
                   description={item?.description}
                   price={item?.price}
                   category={item?.category}
                   priceDrop={item?.priceDrop}
                   id={item?._id}
                   
                   />
               })}
            </div>
            
        </div>
    </div>
  )
}

export default MostSelling