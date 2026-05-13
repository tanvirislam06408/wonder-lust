import NavigateButton from "@/components/shared/NavigateButton";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth.client";
import { getAllBookings, getDataById } from "@/lib/data.";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";

const MyBookings = async () => {
   
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user
    const data = await getAllBookings(user.id)
    
    

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold text-center mb-10">My Bookings</h1>
           <div className="flex flex-col space-y-5 px-5
           ">
            {
                data.length === 0 ? (
                    <h1 className="text-center text-3xl font-bold">Their is no Booking found</h1>
                ) : (
                    data.map(b => (
                        <div className="flex flex-col md:flex-row justify-between shadow border  p-4 rounded-lg" key={b._id}>
                            <div className="flex flex-col md:flex-row gap-5 items-center">
                                <div>
                                    <Image className="max-h-[200px] bg-cover rounded-xl" alt="destination image" src={b.image} width={400} height={500} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{b.destinationName}</h1>
                                    <p className="text-gray-600">{b.description}</p>
                                    <p>Price : ${b.price}</p>
                                    <p>Country : {b.country}</p>
                                    <p>Duration : {b.duration}</p>
                                </div>
                            </div>
                            <NavigateButton b={b} />
                        </div>
                    ))
                )
            }
           </div>
        </div>
    );
};
export default MyBookings;