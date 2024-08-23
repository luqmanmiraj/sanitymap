import React, { useEffect, useState } from 'react';

export default function Page() {
    const [events, setEvents] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);

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
        url.searchParams.set('lat', '30.7');
        window.history.pushState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
        
        // Recall the API to fetch updated events
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
        <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
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
        </main>
    );
}
