import Link from 'next/link';
import React from 'react';
import navImg from '../../public/assets/Wanderlast.png'
import Image from 'next/image';
const Navbar = () => {
    return (
        <nav className='flex justify-between items-center p-8 border-b'>
            <ul className='flex items-center gap-2.5'>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/'}>Destinations</Link>
                </li>
                <li>
                    <Link href={'/'}>My Bookings</Link>
                </li>
                <li>
                    <Link href={'/'}>Admin</Link>
                </li>
            </ul>
            <div>
                <Image src={navImg} alt='navLogo' height={200} width={200} />
            </div>

            <ul className='flex items-center gap-2.5'>
                <li>
                    <Link href={'/'}>Profile</Link>
                </li>
                <li>
                    <Link href={'/'}>Login</Link>
                </li>
                <li>
                    <Link href={'/'}>SignUp</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;