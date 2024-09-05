import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    category:String,
    sizea:Array,
    deliveryInfo:String,
    onSale:String,
    priceDrop:Number,
    imageUrl:String

},{
    timestamps:true
})


export const Product= mongoose.models.Product||mongoose.model('Product',productSchema);

