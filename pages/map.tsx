import React, { useEffect, useState, useCallback } from 'react';
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

interface Data {
    events: Event[];
    categories: string[];
}

export default function Page() {
    const [data, setData] = useState<Data>({ events: [], categories: [] });
    const [totalPosts, setTotalPosts] = useState(0);
    const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

 
    const updateBounds = (newBounds: google.maps.LatLngBounds) => {
        setBounds(newBounds);
        console.log('newBounds', newBounds);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents(page);

    };
    const fetchEvents = useCallback(async (page: number) => {
        console.log('fetchEvents', page);
        try {
            const url = new URL(window.location.href);
            window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            console.log(data);
            setData({ events: data.events, categories: data.categories });
            setTotalPosts(data.totalPosts);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const pageFromUrl = urlParams.get('page');
            
            if (pageFromUrl) {
                setCurrentPage(parseInt(pageFromUrl));
            }
            try {
                const url = new URL(window.location.href);
                window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
                const response = await fetch(`/api/data?${url.searchParams.toString()}`);
                const data = await response.json();
                console.log(data);
                setData({ events: data.events, categories: data.categories });
                setTotalPosts(data.totalPosts);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchData();
    }, []); 

    const handleClick = async (slug: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('lat', '30.9');
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        
        try {
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            setData({ events: data.events.slice(0, 3), categories: data.categories });
            setTotalPosts(data.totalPosts);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    return (
            <div className="home-page" style={{ backgroundColor: '#f8f8f8', padding: '30px' }}>
                <Header />
                <HeroSection categories={data.categories} />
                <div className="flex flex-col lg:flex-row w-full" style={{ backgroundColor: '#FFFFFF' }}>
                        <CategoryNav events={data.events} />
                    <div className="w-full lg:w-1/3 p-2">
                        <div className="w-full h-[500px] sm:w-[436px] sm:h-[750px] rounded-[32px] overflow-hidden">
                            <GoogleMap events={data.events} updateBounds={updateBounds} />
                        </div>
                    </div>
                </div>
                <Pagination totalPosts={totalPosts} currentPage={currentPage} handlePageChange={handlePageChange} />
                <p className="text-1xl font-bold tracking-tighter">
                    {data.events.length > 0 ? JSON.stringify(data.events[0]) : 'No events found'}
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
