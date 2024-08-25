import { NextApiRequest, NextApiResponse } from 'next';
import { sanityAllPosts } from '../../src/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const POSTS_COUNT = 6;
  const EVENTS_QUERY = (page: number, limit: number) => `*[_type == "post"][${(page - 1) * limit}...${page * limit}]`;
  const TOTAL_POSTS_QUERY = `count(*[_type == "post"])`;

  const url = new URL(req.url || '', `https://${req.headers.host}`);
  console.log(url);
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') || POSTS_COUNT.toString()) : POSTS_COUNT;
  const pageNumber = parseInt(page);

  try {
    const events = await sanityAllPosts({
      query: EVENTS_QUERY(pageNumber, limit),
    });
    const totalPosts = await sanityAllPosts({
      query: TOTAL_POSTS_QUERY,
    });

    res.status(200).json({ events, totalPosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
