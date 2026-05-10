import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async() => {
    const res=await fetch('http://localhost:5000/destinations');
    const data=await res.json();
    console.log(data);
    
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 container mx-auto my-20" >
                {
                    data.map(destination=>{ 
                        return <DestinationCard key={destination._id} destination={destination}/>
                     })
                }
            </div>
        </div>
    );
};

export default DestinationPage;