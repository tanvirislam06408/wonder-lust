'use client'
import Link from 'next/link';
import React from 'react';
import navImg from '../../public/assets/Wanderlast.png'
import Image from 'next/image';
import { authClient } from '@/lib/auth.client';
import { Button } from '@heroui/react';
const Navbar = () => {
    const { data } = authClient.useSession();
    const user = data?.user
    
    

    return (
        <nav className='flex justify-between items-center p-8 border-b'>
            <ul className='flex items-center gap-2.5'>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/destination'}>Destinations</Link>
                </li>
                <li>
                    <Link href={'/my-bookings'}>My Bookings</Link>
                </li>
                <li>
                    <Link href={'/add-destination'}>Add Destination</Link>
                </li>
            </ul>
            <div className='md:flex hidden'>
                <Image src={navImg} alt='navLogo' height={200} width={200} />
            </div>

            <ul className='md:flex items-center gap-2.5 hidden'>
                <li>
                    <Link href={'/'}>Profile</Link>
                </li>
                {
                    user ?
                        <Button variant='danger-soft' onClick={async()=>await authClient.signOut()}>SignOut</Button> : <><li>
                            <Link href={'/login'}>Login</Link>
                        </li>
                            <li>
                                <Link href={'/signup'}>SignUp</Link>
                            </li></>
                }
            </ul>
        </nav>
    );
};

export default Navbar;