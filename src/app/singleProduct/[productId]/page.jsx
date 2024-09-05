'use client'
import React, { useEffect, useState } from 'react'
import './singleproduct.scss'
import Loading from '@/components/loading/Loading'
import axios from 'axios'
import { priceDisco } from '@/utils/cardLogic'

const SingleProduct = ({params}) => {

  const [loading,setLoading]=useState(false)

  const [product,setProduct]=useState([])

  const fetchSingleProduct=async()=>{

    try{
      setLoading(true)

      const {data}=await axios.get(`/api/product/get-single-product?id=${params?.productId}`)
      setLoading(false)
      if(data.success){
        setProduct(data.product)
        setLoading(false)
      }


    }catch(err){
      console.log(err.message)
      setLoading(false)
    }


  }
    useEffect(()=>{
      fetchSingleProduct()

    },[])

    console.log(product.name)
  return (
    <div>
       {loading&&<Loading/> }
       <div className='product-conatinet'>
        
          <div className='product'>
            <div className='img-btn'>
             <h1 className='category'>{product?.category}</h1>
              <img src={product?.imageUrl} alt="img" />
              <h1 className='title'>{product?.name}</h1>
              <h1 className='delivery'>{product?.deliveryInfo}</h1>
              <button>Add To Cart</button>
            </div>
            <div className='price-des'>
              <h1>Price</h1>
              <div className='price-discound'>
                <h3 className='throw'>{product?.price}</h3>
                
               
                <h3 >{priceDisco(product?.price,product?.priceDrop)}</h3>
                <h3 className='discount'>{product?.priceDrop}%</h3>
              </div>
              <h1>Size</h1>
              {product?.product?.sizea.map((s,i)=>(
                <button>{s}</button>

              ))}
              <h1>Description</h1>
              <p className='desc'>{product?.description}</p>
              
            </div>
          </div>
          
        
       </div>
    
    </div>
  )
}

export default SingleProduct