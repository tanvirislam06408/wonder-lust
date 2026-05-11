import { Button } from '@heroui/react';
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DestinationCard = ({destination}) => {
    const {destinationName,image,duration,country,price,_id}=destination;
    return (
        <div  className='border p-3 rounded-2xl'>
            <div >
                <Image className='object-cover h-48 rounded-2xl w-full' src={destination?.image} alt='img logo' height={400} width={400}/>
            </div>
            <div className="flex justify-between mt-4">
                <div className='space-y-1'>
               <h1 className='flex items-center gap-2.5'> <MapPin /> {country}</h1>
               <h1 className='text-xl font-semibold'>{destinationName}</h1>
               <p className='flex items-center gap-2'><CalendarDays /> {duration}</p>
               <Link href={`/destination/${_id}`}><Button variant='outline' className={'text-blue-500 mt-3'} ><ArrowUpRight /> Book Now</Button>
</Link>
            </div>
            <p className='text-2xl font-bold'>${price}</p>
            </div>
        </div>
    );
};

export default DestinationCard;