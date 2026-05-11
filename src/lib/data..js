export const getDataById=async(id)=>{
    const res=await fetch(`http://localhost:5000/destinations/${id}`)
    const data=await res.json();
    return data;
    
}