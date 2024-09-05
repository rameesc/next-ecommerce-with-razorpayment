import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchAllProdcut=createAsyncThunk('product/fetchAllProdcut',async(page)=>{

    try{

        const {data}=await axios.get(`/api/product/get-all-product?page=${Number(page)}`)

        return data



    }catch(error){
        return error.message
    }
})


const sliceProduct=createSlice({
    name:'product',
    initialState:{
        Allproduct:'',
        loading:false,
        totalProduct:0,
        pageCount:0,
        message:''
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProdcut.pending,(state,action)=>{
            state.loading=true

        })
        builder.addCase(fetchAllProdcut.fulfilled,(state,action)=>{
            //console.log(action)
            state.loading=false
            state.Allproduct=action.payload.allProduct;
            state.totalProduct=action.payload.totalProduct;
            state.pageCount=action.payload.pageCount;


        })
        builder.addCase(fetchAllProdcut.rejected,(state,action)=>{
            state.loading=false,
            state.message=action.error

        })
    }
})

export default sliceProduct.reducer