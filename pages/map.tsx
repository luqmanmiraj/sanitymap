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

const POSTS_PER_PAGE = 6;

export default function Page() {
    const [data, setData] = useState<Data>({ categories: [] });
    const [selectedSeason, setSelectedSeason] = useState<string>('');
    const [allPosts, setAllPosts] = useState<Event[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<Event[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [budget, setBudget] = useState<string | null>(null);
    const [explorerTypes, setExplorerTypes] = useState<string | null>(null);
    const [languages, setLanguages] = useState<string | null>(null);
    const [accessibility, setAccessibility] = useState<string | null>(null);

    const updateBounds = (newBounds: google.maps.LatLngBounds) => {
        setBounds(newBounds);
        console.log('newBounds', newBounds);
        const url = new URL(window.location.href);
        url.searchParams.set('bounds', JSON.stringify(newBounds.toJSON()));
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        setDisplayedPosts(allPosts.slice(startIndex, endIndex));
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
    };

    const handleCategoriesSelected = (selectedCategories: string[]) => {
        setCurrentPage(1);
        const url = new URL(window.location.href);
        url.searchParams.set('page', '1');
        setSelectedCategories(new Set(selectedCategories));
        url.searchParams.set('categories', selectedCategories.join(','));
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents();
    };

    const handleSeasonsSelected = (selectedSeason: string) => {
        setSelectedSeason(selectedSeason);
    };

    const fetchEvents = useCallback(async () => {
        try {
            // setLoading(true);
            const url = new URL(window.location.href);
            window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            setDisplayedPosts(data.posts.slice(0, POSTS_PER_PAGE));
            setAllPosts(data.posts);
            setTotalPosts(data.totalPosts);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            console.log('fetchEvents', data)
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const pageFromUrl = urlParams.get('page');
            const categoriesFromUrl = urlParams.get('categories');
            setBudget(urlParams.get('budget'));
            setExplorerTypes(urlParams.get('explorerTypes'));
            setLanguages(urlParams.get('languages'));
            setAccessibility(urlParams.get('accessibility'));
            if (categoriesFromUrl) {
                setSelectedCategories(new Set(categoriesFromUrl.split(',')));
            }
            if (pageFromUrl) {
                setCurrentPage(parseInt(pageFromUrl));
            }
            try {
                setLoading(true);
                const url = new URL(window.location.href);
                window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
                const response = await fetch(`/api/data?${url.searchParams.toString()}`);
                const data = await response.json();
                setDisplayedPosts(data.posts.slice(0, POSTS_PER_PAGE));
                setAllPosts(data.posts);
                setData({ categories: data.categories });
                setTotalPosts(data.totalPosts);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                console.log('fetchData', data)
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home-page " style={{ backgroundColor: 'white', padding: '30px' }}>
            <Header selectedSeason={selectedSeason} handleSeasonsSelected={handleSeasonsSelected} />
            <HeroSection selectedCategories={Array.from(selectedCategories)} categories={data.categories} handleCategoriesSelected={handleCategoriesSelected} />
            {allPosts.length > 0 &&
                <p className="text-gray-500 m-4 text-black">
                    {allPosts.length} results
                </p>
            }
            <div className="w-[100%] sm:flex flex-row" style={{ backgroundColor: '#FFFFFF' }}>
                <CategoryNav 
                    events={displayedPosts} 
                    loading={loading} 
                    budget={budget}
                    explorerTypes={explorerTypes?.split(',')||[]}
                    languages={languages?.split(',')||[]}
                    accessibility={accessibility?.split(',')||[]}
                />
                <div className=" p-2">
                    <div className="w-full h-[500px] lg:w-[450px] md:w-[300px] sm:w-[250px] sm:h-[750px] rounded-[32px] overflow-hidden">
                        <GoogleMap events={allPosts} updateBounds={updateBounds} />
                    </div>
                </div>
            </div>
            <Pagination totalPosts={totalPosts} currentPage={currentPage} handlePageChange={handlePageChange} postsPerPage={POSTS_PER_PAGE} />
            <div>
                {/* Additional components can be uncommented if needed */}
            </div>
        </div>
    );
}
