import React from 'react'
import './loading.scss'
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div className='loading-container'>
        <div className='loading'>
        <BeatLoader
        size={100}
        color='white'
        
         />

        </div>
    </div>
   

     
  )
}

export default Loading