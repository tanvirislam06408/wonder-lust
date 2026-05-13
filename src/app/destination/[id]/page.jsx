
import { DeleteModal } from '@/components/DeleteModal';
import EditModel from '@/components/EditModel';
import Booking from '@/components/shared/Booking';
import { authClient } from '@/lib/auth.client';
import { getDataById } from '@/lib/data.';
import { Button } from '@heroui/react';
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DestinationDetails = async ({ params }) => {
    const { id } = await params;
    const details = await getDataById(id);

    
    const { destinationName, image, duration, country, price, _id, description } = details;

   
    return (
        <div className='container mx-auto mt-4 px-3.5 md:px-0'>
            <div className="flex justify-between items-center">
                <Link href={'/destination'}> <h1 className='text-lg md:text-xl text-gray-500 font-medium flex  gap-1.5'><ArrowLeft /> Back To Destinations</h1></Link>
                <div className='flex gap-3'>
                    <EditModel details={details} />
                    <DeleteModal details={details} />
                </div>
            </div>
            <div className="w-full my-5">
                <Image className='w-full object-cover max-h-[50vh]' alt={destinationName} src={image} height={500} width={500} />
            </div>

            <div className="flex justify-between my-10">
                <div className='space-y-1'>
                    <h1 className='flex items-center gap-2.5'> <MapPin /> {country}</h1>
                    <h1 className='text-xl font-semibold'>{destinationName}</h1>
                    <p className='flex items-center gap-2'><CalendarDays /> {duration}</p>
                    <h1 className='text-xl font-bold mt-6'>OverView</h1>
                    <p>{description}</p>

                </div>
                <div className='flex items-center gap-3'>
                    <p className='text-2xl font-bold'>${price}</p>
                    <Booking details={details}/>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetails;