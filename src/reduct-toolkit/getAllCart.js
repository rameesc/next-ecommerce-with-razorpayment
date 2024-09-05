import { axioss } from "@/utils/axios";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const fetchCartItem=createAsyncThunk('cart/createAsyncThunk',async()=>{
    try{

        const {data}=await axios.get(`/api/cart/all-cart-item`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
              }

        })
        return data


    }catch(error){
        return error.message
    }
})




const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:'',
        subTotal:0,
        deliveryCharge:0,
        loading:false,
        message:''
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartItem.pending,(state,action)=>{
            state.loading=true

        })
        builder.addCase(fetchCartItem.fulfilled,(state,action)=>{
           
            state.loading=false
            state.deliveryCharge=action.payload.deliveryCharge
            state.subTotal=action.payload.subTotal
            state.cart=action.payload.cart


        })
        builder.addCase(fetchCartItem.rejected,(state,action)=>{
            state.loading=false
            state.message=action.error

        })
    }
})


export default cartSlice.reducer