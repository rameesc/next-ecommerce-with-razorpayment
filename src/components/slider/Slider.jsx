
'use clinet'
import React, { useEffect, useState } from 'react'
import './slider.scss'
import axios from 'axios'
import Link from 'next/link'

const Slider = () => {
  const [slide,setSlide]=useState([])
  const [currentIndex,setCurrentIndex]=useState(0)
  const fetchSlider=async()=>{
   

    try{
      const {data}=await axios.get('/api/slider/all-slider')

      console.log(data)
      if(data.success){
        setSlide(data?.slider)

      }



    }catch(error){
      console.log(error)

    }
  }
  
  const sliderLength=slide.length
  
  
  useEffect(()=>{
    fetchSlider()

  },[])

  const previousHandler=()=>{
    if(currentIndex==0){
      return setCurrentIndex(sliderLength-1)

    }
    setCurrentIndex((pre)=>pre-1)

  }

  const nextHandler=()=>{
   
    if(sliderLength-1==currentIndex){
      return setCurrentIndex(0)
     }
     setCurrentIndex((pre)=>pre+1)
  

  }
  return (
    <div className='slide-conatiner'>
      <div className='slider' style={{transform:`translateX(-${currentIndex*100}%)`}} >
      {slide?.map((item,index)=>{
        return(
          <div  className='slide'>
            <img   src={item.img} alt="" />
            <div className='text'>
              <h1>{item?.content}</h1>
              <Link href={item?.btnUrl}>
              <button>Shop Now</button>
              </Link>
            </div>
            <div className='previous'>
              <button onClick={previousHandler}>Pre</button>
            </div>
            <div className='nextBtn'>
              <button  onClick={nextHandler}>Next</button>
            </div>
            <div className='btn'>
              {[...Array(slide.length)].map((item,index)=>{

                return(
                  <div onClick={()=>setCurrentIndex(index)} style={{border:currentIndex==index?'5px solid blue':'5px solid'}} className='out-line'>
                    <div className='round'></div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Slider