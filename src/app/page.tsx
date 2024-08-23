import Link from "next/link";
import { headers } from 'next/headers';

import { client, sanityAllPosts } from "../sanity/lib/client";

const headersList = headers();
console.log("8888888888888jjj")
console.log(headersList.get('referer'))
const requestedPage = headersList.entries();
const searchParams = new URLSearchParams(headersList.get('referer')?.split('?')[1]);
console.log("Search Params:", Array.from(searchParams.entries()));




console.log("Requested page:", requestedPage);
const POSTS_COUNT = 6;
const EVENTS_QUERY = `*[_type == "post"][0...${POSTS_COUNT}]`;

interface Event {
  _id: string;
  title: string;
  date: string;
  slug: {
    current: string;
  };
}





export default async function IndexPage() {
  
  
  const events = await sanityAllPosts({
    query: EVENTS_QUERY,
  });


  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">
        Events
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {events.map((event: Event) => (
          <li
            className="bg-white p-4 rounded-lg"
            key={event._id}
          >
            {event.slug && <Link href={`/${event.slug.current}`}>link</Link>}
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
