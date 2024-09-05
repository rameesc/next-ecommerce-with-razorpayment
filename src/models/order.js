
import mongoose from 'mongoose'



const orderSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderItems:[{
        qty:{
            type:Number,
            required:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        }
    }],
    shippingAddress:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Address"
        
    },
    paymentMethod:{
        type:String,
        required:true,
        default:'stripe'
    },
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
    },
    paidAt:{
        type:Date,
        default:Date.now()

    },
    isProcessing:{
        type:Boolean,
        required:true
    }


},{
    timestamps:true
})

export const Order=mongoose.models.Order||mongoose.model('Order',orderSchema);
