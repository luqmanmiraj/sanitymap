import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection/HeroSection';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Pagination from '../components/Pagination/Pagination';
import DatePicker from '../components/DatePicker/DatePicker';
import Months from '../components/Months/Months';
import More from '../components/More/More';
import CategoryDropDown from '../components/CategoryDropDown/CategoryDropDown';






const GoogleMap = dynamic(() => import('../com/googlemap'), { ssr: false });

interface Event {
    _id: string;
    slug: { current: string };
    title: string;
    date: string;
}

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

 
    const updateBounds = (newBounds: google.maps.LatLngBounds) => {
        setBounds(newBounds);
        console.log('newBounds', newBounds);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log('currentPage', currentPage);

        // fetchEvents(page);

    };
    async function fetchEvents(page: number) {
        console.log('fetchEvents', page);
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('page', page.toString());
            window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            console.log(data);
            setEvents(data.events);
            setTotalPosts(data.totalPosts);
            // setCurrentPage(page);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pageFromUrl = urlParams.get('page');
        if (pageFromUrl) {
        }
        fetchEvents(currentPage);

    }, [currentPage]); 

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
                <Pagination totalPosts={totalPosts} currentPage={currentPage} handlePageChange={handlePageChange} />
                <p className="text-1xl font-bold tracking-tighter">
                    {events.length > 0 ? JSON.stringify(events[0]) : 'No events found'}
                </p>
                <div>
            <h1>Date Picker</h1>
            <DatePicker />
            <Months />  
            <More />
            <CategoryDropDown />
        </div>
            
            </div>
    );
}
