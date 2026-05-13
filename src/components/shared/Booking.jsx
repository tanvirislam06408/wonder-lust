'use client'
import { authClient } from '@/lib/auth.client';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const Booking = ({ details }) => {
    const { destinationName, image, duration, country, price, _id, description } = details;

    const { data: session, isPending, error } = authClient.useSession();
    const user = session?.user;

    if (isPending) return <Button isLoading className={'text-cyan-500'} variant='outline'>Loading...</Button>;
    
    if (!user) {
        return <Button as={Link} href="/login" className={'text-cyan-500'} variant='outline'>Login to Book</Button>;
    }

    const handleBook = async () => {
        const bookingData = {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userImage: user.image,
            destinationName,
            image,
            bookedId :_id,
            country,
            duration,
            price,
            description
        }
        try {
            const res = await fetch('http://localhost:5000/book-destination', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            })
            const data = await res.json();
            console.log(data);
            alert("Booking successful!");
        } catch (err) {
            console.error("Booking error:", err);
            alert("Failed to book destination.");
        }
    }

    return <Button onClick={handleBook} className={'text-cyan-500'} variant='outline'>Book Now</Button>;
};

export default Booking;