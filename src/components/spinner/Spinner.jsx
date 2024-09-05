'use client'
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Spinner = () => {
  return (
    <ClipLoader
        
      
        size={20}
        color='white'
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Spinner