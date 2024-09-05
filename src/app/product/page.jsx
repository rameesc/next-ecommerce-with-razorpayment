"use client"
import React, { useEffect, useState } from 'react'
import './product.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProdcut } from '@/reduct-toolkit/allproductSlice'
import Link from 'next/link'
import Card from '@/components/card/Card'
import Loading from '@/components/loading/Loading'

const AllProduct = () => {

  const [page,setPage]=useState(0)
  

  const dispatch=useDispatch();
  const {
          Allproduct,loading,message,pageCount,totalProduct}=useSelector((state)=>state.allProduct)
 

  useEffect(()=>{
    dispatch(fetchAllProdcut(page))

  },[])
    
  return (
   
    <div className='all-product'>
     {  loading&&<Loading/>}
        <h2>All Product</h2>
        <div className='product-conatiner'>
          {Allproduct.length>0 ?(
            <div className='product-cart'>
              {Allproduct.map((item,index)=>{
                  return   <Card 
                  img={item?.imageUrl} 
                  description={item?.description}
                  price={item?.price}
                  category={item?.category}
                  priceDrop={item?.priceDrop}
                  id={item?._id}
                  />
              })}
            </div>

          ):(
            <div>
              <h1>Product Not Found</h1>
              <Link href={'/'} ><button>Go Back</button></Link>
            </div>
          )}
        </div>

    </div>
  )
}

export default AllProduct