import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection/HeroSection';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Pagination from '../components/Pagination/Pagination';
import DatePicker from '../components/DatePicker/DatePicker';
import Months from '../components/Months/Months';
import More from '../components/More/More';






const GoogleMap = dynamic(() => import('../com/googlemap'), { ssr: false });

interface Event {
    _id: string;
    slug: { current: string };
    title: string;
    date: string;
}

interface Data {
    categories: string[];
}

export default function Page() {
    const [data, setData] = useState<Data>({ categories: [] });
    const [posts, setPosts] = useState<Event[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

 
    const updateBounds = (newBounds: google.maps.LatLngBounds) => {
        setBounds(newBounds);
        console.log('newBounds', newBounds);
        const url = new URL(window.location.href);
        url.searchParams.set('bounds', JSON.stringify(newBounds.toJSON()));
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents(1);
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents(page);

    };
    const handleCategoriesSelected = (selectedCategories: string[]) => {
        setCurrentPage(1);
        const url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        setSelectedCategories(prevSelectedCategories => {
            const newSelectedCategories = new Set(prevSelectedCategories);
            selectedCategories.forEach(category => newSelectedCategories.add(category));
            return newSelectedCategories;
        });
        url.searchParams.set('categories', Array.from(selectedCategories).join(','));
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents(1);
    };
    const fetchEvents = useCallback(async (page: number) => {
        console.log('fetchEvents', page);
        try {
            const url = new URL(window.location.href);
            window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            setPosts(data.posts);
            setTotalPosts(data.totalPosts);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const pageFromUrl = urlParams.get('page');
            const categoriesFromUrl = urlParams.get('categories');
            if (categoriesFromUrl) {
                setSelectedCategories(new Set(categoriesFromUrl.split(',')));
            }
            if (pageFromUrl) {
                setCurrentPage(parseInt(pageFromUrl));
            }
            try {
                const url = new URL(window.location.href);
                window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
                const response = await fetch(`/api/data?${url.searchParams.toString()}`);
                const data = await response.json();
                console.log(data);
                setPosts(data.posts);
                setData({ categories: data.categories });
                setTotalPosts(data.totalPosts);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchData();
    }, []); 


    return (
            <div className="home-page" style={{ backgroundColor: '#f8f8f8', padding: '30px' }}>
                <Header />
                <HeroSection selectedCategories={Array.from(selectedCategories)} categories={data.categories} handleCategoriesSelected={handleCategoriesSelected} />
                <div className="flex flex-col lg:flex-row w-full" style={{ backgroundColor: '#FFFFFF' }}>
                        <CategoryNav events={posts} />
                    <div className="w-full lg:w-1/3 p-2">
                        <div className="w-full h-[500px] sm:w-[436px] sm:h-[750px] rounded-[32px] overflow-hidden">
                            <GoogleMap events={posts} updateBounds={updateBounds} />
                        </div>
                    </div>
                </div>
                <Pagination totalPosts={totalPosts} currentPage={currentPage} handlePageChange={handlePageChange} />
                <p className="text-1xl font-bold tracking-tighter">
                    Posts: {posts.length > 0 ? JSON.stringify(posts[0]) : 'No events found'}
                </p>
                <div>
            <h1>Date Picker</h1>
            <DatePicker />
            <Months />  
            <More />
        </div>
            
            </div>
    );
}
