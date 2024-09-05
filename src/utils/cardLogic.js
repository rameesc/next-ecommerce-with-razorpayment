


export const descriptionLength=(description)=>{


    return description.length>50? 

    `${description.slice(0,100)}...`:description

}
export const priceDisco=(price,priceDrop)=>{

    return price-price*priceDrop/100

}


//orders date and time logic

export const dateTimeFormatte=(timestamp,formate)=>{

    const date=new Date(timestamp)

    //date and time formatte
   return formate=='date'?date.toLocaleDateString():date.toLocaleTimeString()

}