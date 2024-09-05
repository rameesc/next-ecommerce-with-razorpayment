import axios from "axios";


export const axioss=axios.create({

    baseURL:'http://localhost:3000',
    // headers:{
    //     Authorization:`Bearer ${localStorage.getItem('TOKEN')}`
    // }
})