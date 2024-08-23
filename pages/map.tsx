import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection/HeroSection';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';



const GoogleMap = dynamic(() => import('../com/googlemap'), { ssr: false });

interface Event {
    _id: string;
    slug: { current: string };
    title: string;
    date: string;
    // Add other properties if needed
}

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

 
    const updateBounds = (newBounds: google.maps.LatLngBounds) => {
        setBounds(newBounds);
        console.log('newBounds', newBounds);
    };
    

    useEffect(() => {
        async function fetchEvents() {
            try {
                const url = new URL(window.location.href);
                const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
                const data = await response.json();
                console.log(data);
                setEvents(data.events);
                setTotalPosts(data.totalPosts);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        }

        fetchEvents();
    }, []);

    const handleClick = async (slug: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('lat', '30.9');
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        
        try {
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            setEvents(data.events.slice(0, 3));
            setTotalPosts(data.totalPosts);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    return (
        <div className="home-page" style={{ backgroundColor: '#f8f8f8', padding: '30px' }}>
            <Header />
            
                <HeroSection />
  <div className="flex flex-col lg:flex-row w-full" style={{ backgroundColor: '#FFFFFF' }}>

                <CategoryNav events={events} />
                <div className="w-full lg:w-1/3 p-2">
      <div className="w-full h-[500px] sm:w-[436px] sm:h-[750px] rounded-[32px] overflow-hidden">
        <GoogleMap events={events} updateBounds={updateBounds} />
      </div>
    </div>
                </div>
            <h1 className="text-4xl font-bold tracking-tighter">
                Events
            </h1>
            <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {events.map((event) => (
                    <li
                        className="bg-white p-4 rounded-lg"
                        key={event._id}
                        onClick={() => handleClick(event.slug.current)}
                    >
                        <h2 className="text-xl font-semibold">{event?.title}</h2>
                        <p className="text-gray-500">
                            {new Date(event?.date).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
           
        </div>
    );
}
