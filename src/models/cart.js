import mongoose from 'mongoose'



const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }


},{
    timestamps:true
})

export const Cart=mongoose.models.Cart||mongoose.model("Cart",cartSchema)
