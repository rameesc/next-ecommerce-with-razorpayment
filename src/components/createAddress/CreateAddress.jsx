"use client"
import React from 'react'
import './createAddress.scss'

const CreateAddress = ({setCreateAddress}) => {
  return (
    <div className='address-container'>
        <div className='create-address'>
            <div className='close'>
                <h1 onClick={()=>setCreateAddress(false)}>X</h1>
            </div>
            <h1>create Address</h1>
            <div className='field'>
                <label htmlFor="">Address</label>
                <input type="text" />
            </div>
            <div className='field'>
                <label htmlFor="">City</label>
                <input type="text" />
            </div>
            <div className='field'>
                <label htmlFor="">Full name</label>
                <input type="text" />
            </div>
            <div className='field'>
                <label htmlFor="">Phone</label>
                <input type="text" />
            </div>
            <div className='field'>
                <label htmlFor="">Pin Code</label>
                <input type="text" />
            </div>
            <button>Create Address</button>
        </div>
    </div>
  )
}

export default CreateAddress