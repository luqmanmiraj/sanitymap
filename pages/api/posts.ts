import { NextApiRequest, NextApiResponse } from 'next';
import { sanityAllPosts } from '../../src/sanity/lib/client';
const POSTS_COUNT = 6;
const EVENTS_QUERY = `*[_type == "post"][0...${POSTS_COUNT}]`;
const TOTAL_POSTS_QUERY = `count(*[_type == "post"])`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = new URL(req.url || '', `https://${req.headers.host}`);
    console.log(url);
    const lat = url.searchParams.get('lat');
    const lng = url.searchParams.get('lng');
    // const query = lat && lng ? `*[_type == "post" && location.lat == ${lat} && location.lng == ${lng}][0...${POSTS_COUNT}]` : EVENTS_QUERY;
  try {
    const events = await sanityAllPosts({
      query: EVENTS_QUERY,
    });
    const totalPosts = await sanityAllPosts({
      query: TOTAL_POSTS_QUERY,
    });
    res.status(200).json({ events, totalPosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
