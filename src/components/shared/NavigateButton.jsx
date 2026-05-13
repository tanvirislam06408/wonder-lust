'use client'
import { deleteBooking} from "@/lib/data.";
import { Button } from "@heroui/react";
import Link from "next/link";


const NavigateButton = ({b}) => {
    const handleDelete=async(id)=>{
        const data=await deleteBooking(id);
        if(data.deletedCount>0){
            alert('Booking deleted successfully');
        }
    }
    return (
        <div className="flex flex-col flex-col-reverse md:flex-row  gap-2">
                <Button onClick={()=>{handleDelete(b._id)}} variant="danger-soft" className={'rounded-none w-full'}>Cancel</Button>
                <Link href={`/destination/${b._id}`}><Button variant="primary" className={'rounded-none bg-cyan-500 w-full'}>View</Button></Link>
            </div>
    );
};

export default NavigateButton;