import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection/HeroSection';
import Header from '../components/Header/Header';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import DatePicker from '../components/DatePicker/DatePicker';
import Months from '../components/Months/Months';
import More from '../components/More/More';
import Pagination from '../components/Pagination/Pagination';


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
    const [query, setQuery] = useState<string | null>(null);
    const [showMap, setShowMap] = useState(false);

    const updateBounds = (newBounds: google.maps.LatLngBounds) => {
        setBounds(newBounds);
        const url = new URL(window.location.href);
        url.searchParams.set('bounds', JSON.stringify(newBounds.toJSON()));
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents();
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        const startIndex = (nextPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        setDisplayedPosts(allPosts.slice(0, endIndex));
    };

    const handleSearchQuery = (query: string) => {
        setQuery(query);
        const url = new URL(window.location.href);
        url.searchParams.set('query', query);
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        fetchEvents();
    }
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
    }

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            const url = new URL(window.location.href);
            window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
            const response = await fetch(`/api/posts?${url.searchParams.toString()}`);
            const data = await response.json();
            setDisplayedPosts(data.posts.slice(0, POSTS_PER_PAGE));
            setAllPosts(data.posts);
            setTotalPosts(data.totalPosts);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
        finally {
            setLoading(false);
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
                const sortedPosts = data.posts.sort((a: any, b: any) => calculateMatchPercentage(
                    b,
                    urlParams.get('budget') || '',
                    urlParams.get('explorerTypes')?.split(',') || [],
                    urlParams.get('languages')?.split(',') || [],
                    urlParams.get('accessibility')?.split(',') || []
                ) - calculateMatchPercentage(
                    a,
                    urlParams.get('budget') || '',
                    urlParams.get('explorerTypes')?.split(',') || [],
                    urlParams.get('languages')?.split(',') || [],
                    urlParams.get('accessibility')?.split(',') || []
                ));
                setDisplayedPosts(sortedPosts.slice(0, POSTS_PER_PAGE));
                setAllPosts(sortedPosts);
                setData({ categories: data.categories });
                setTotalPosts(data.totalPosts);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);


    const calculateMatchPercentage = (event: any, budget = '', explorerTypes: string[] = [], languages: string[] = [], accessibility: string[] = []) => {
        let totalCriteria = 0;
        let matchedCriteria = 0;
        // Convert comma-separated strings to arrays
        const explorerTypesArray = explorerTypes
        const languagesArray = languages
        const accessibilityArray = accessibility

        // Count the number of criteria types provided
        const criteriaTypes = [budget, explorerTypesArray.length > 0, languagesArray.length > 0, accessibilityArray.length > 0];
        const totalTypes = criteriaTypes.filter(Boolean).length;

        // Check budget
        if (budget) {
            totalCriteria++;
            if (event.budget?.toLocaleLowerCase() === budget.toLocaleLowerCase()) {
                matchedCriteria++;
            }
        }
        // Check explorerTypes
        if (explorerTypesArray.length > 0) {
            totalCriteria++;
            const eventExplorerTypes = event.Explorer || [];
            const explorerTypesMatch = explorerTypesArray.every(type => eventExplorerTypes.includes(type));
            if (explorerTypesMatch) {
                matchedCriteria++;
            }
        }

        // Check languages  
        if (languagesArray.length > 0) {
            totalCriteria++;
            const eventLanguages = event.Language || [];
            const languagesMatch = languagesArray.every(lang => eventLanguages.includes(lang));
            if (languagesMatch) {
                matchedCriteria++;
            }
        }

        // Check accessibility
        if (accessibilityArray.length > 0) {
            totalCriteria++;
            const eventAccessibility = event.Accessibility || [];
            const accessibilityMatch = accessibilityArray.every(acc => eventAccessibility.includes(acc));
            if (accessibilityMatch) {
                matchedCriteria++;
            }
        }

        // Calculate the match percentage
        const percentage = totalTypes > 0 ? (matchedCriteria / totalTypes) * 100 : 0;
        return Math.round(percentage);
    };

    return (
        <div className="home-page p-1 md:p-7 bg-white" >
            <Header selectedSeason={selectedSeason} handleSeasonsSelected={handleSeasonsSelected} fetchEvents={fetchEvents} />
            <HeroSection selectedCategories={Array.from(selectedCategories)} categories={data.categories} handleCategoriesSelected={handleCategoriesSelected} handleSearchQuery={handleSearchQuery} query={query || ''} />
            {allPosts.length > 0 &&
                <p className="text-gray-500 m-4 text-black">
                    {allPosts.length} results
                </p>
            }
            <div className="w-full sm:flex flex-row bg-white mb-[50px]" >
                <CategoryNav
                    events={displayedPosts}
                    loading={loading}
                    budget={budget || ''}
                    explorerTypes={explorerTypes?.split(',') || []}
                    languages={languages?.split(',') || []}
                    accessibility={accessibility?.split(',') || []}
                />
                <div className={`p-2 w-full h-full ${showMap ? 'fixed md:relative inset-0 bg-black bg-opacity-50 flex justify-center items-center' : 'lg:w-1/2 hidden sm:block'}`}>
                    <div className={`bg-white p-4 rounded-lg w-full ${showMap ? 'max-w-lg' : ''}`}>
                        {showMap && (
                            <button
                                className="absolute top-2 right-2 text-black rounded-full px-2 bg-gray-200 hover:bg-gray-300"
                                onClick={() => setShowMap(false)}
                            >
                                x
                            </button>
                        )}
                        <div className="w-full h-[700px] rounded-[32px] overflow-hidden">
                            <GoogleMap events={allPosts as any} updateBounds={updateBounds} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex font-bold justify-center mt-4 sm:hidden fixed bottom-0 left-0 right-0 bg-white p-4">
                <button
                    className="bg-black text-white px-4 py-2 rounded-md flex items-center mx-2"
                    onClick={() => setShowMap(true)}
                >
                    See map
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.50871 17.4998C2.3503 17.4998 2.19189 17.4499 2.06683 17.3749C1.8167 17.2167 1.66663 16.9502 1.67496 16.6671L1.67496 5.84139H1.66663C1.66663 5.52495 1.84171 5.23349 2.12519 5.10025L7.09707 2.6173C7.10715 2.61165 7.11735 2.6062 7.12769 2.60096V2.59368C7.36114 2.46877 7.63628 2.46877 7.87807 2.59368L12.5054 4.90039L17.1327 2.59368C17.5412 2.3855 18.0415 2.54372 18.2499 2.96009C18.2999 3.06835 18.3333 3.20159 18.3333 3.3265L18.3333 14.1522C18.325 14.4603 18.1499 14.7518 17.8747 14.8933L13.0516 17.302C12.9061 17.4254 12.718 17.5 12.5134 17.5C12.3289 17.5 12.1599 17.4415 12.0231 17.3424L7.49454 15.0849L2.86723 17.3916C2.7505 17.4499 2.6171 17.4749 2.49204 17.4832L2.50871 17.4998ZM13.3471 15.3174L16.6825 13.6517L16.6825 4.68388L13.3471 6.34587L13.3471 15.3174ZM11.6796 6.34546L11.6796 15.3178L8.34477 13.6554L8.34477 4.68303L11.6796 6.34546ZM3.34246 6.34937L6.67727 4.68397L6.67727 13.648L3.34246 15.3097L3.34246 6.34937Z" fill="white" />
                    </svg>

                </button>
                <button
                    className="border border-black text-black px-4 py-2 rounded-md flex items-center mx-2"
                    onClick={handleLoadMore}
                >
                    Load more
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0085 16.6667L10.0084 16.6666C10.278 16.6665 10.5186 16.5368 10.6711 16.3366L15.5919 11.4159C15.9169 11.0826 15.9169 10.5576 15.5919 10.2326C15.2585 9.90007 14.7335 9.90007 14.4085 10.2334L10.8414 13.8005L10.8414 4.16665C10.8414 3.69998 10.4664 3.33331 10.0081 3.33331C9.54143 3.33331 9.17476 3.69998 9.17476 4.16665L9.17476 13.8155L5.59996 10.2407C5.26663 9.90821 4.74163 9.90821 4.41663 10.2415C4.08329 10.5665 4.08329 11.0915 4.41663 11.4249L9.40345 16.4117C9.40726 16.4156 9.41112 16.4194 9.41502 16.4233L9.41663 16.4249C9.4337 16.4419 9.45163 16.4583 9.47035 16.4738C9.52401 16.5183 9.58407 16.5562 9.64851 16.5863C9.74268 16.631 9.84696 16.6587 9.95762 16.6652C9.97452 16.6662 9.9915 16.6667 10.0085 16.6667Z" fill="black" />
                    </svg>

                </button>
            </div>

            <div className=' sm:block hidden'>
                <Pagination totalPosts={totalPosts} currentPage={currentPage} handlePageChange={handlePageChange} postsPerPage={POSTS_PER_PAGE} />
            </div>
        </div>
    );
}
