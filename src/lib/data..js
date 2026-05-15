   'use server'

import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import { headers } from "next/headers";





export const getDataById=async(id)=>{

const {token}=await auth.api.getToken({
    headers: await headers()
})


    const res=await fetch(`http://localhost:5000/destinations/${id}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    const data=await res.json();
    return data;
    
}

export const getAllBookings=async(id)=>{
    const {token}=await auth.api.getToken({
        headers:await headers()
    });
    
    const res=await fetch(`http://localhost:5000/book-destination/${id}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const data=await res.json();
    return data;
    
}

export const deleteBooking=async(id)=>{
 
    const res=await fetch(`http://localhost:5000/book-destination/${id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        }
    })
    const data=await res.json();
    if(data.deletedCount>0){
        revalidatePath('/my-bookings')
    }
    return data;
}