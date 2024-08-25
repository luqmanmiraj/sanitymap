import { NextApiRequest, NextApiResponse } from 'next';
import { sanityAllPosts } from '../../src/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const POSTS_COUNT = 6;
  const EVENTS_QUERY = (page: number, limit: number, categories: string[], bounds: { south: number, west: number, north: number, east: number }) => {
    const categoryFilter = categories.length > 0 ? `&& count((categories[]->slug.current)[@ in [${categories.map(cat => `"${cat}"`).join(', ')}]]) > 0` : '';
    const boundsFilter = bounds ? `&& location.lat >= ${bounds.south} && location.lat <= ${bounds.north} && location.lng >= ${bounds.west} && location.lng <= ${bounds.east}` : '';
    const query = `*[_type == "post" ${categoryFilter} ${boundsFilter}][${(page - 1) * limit}...${page * limit}]`;
    return query;
  };
  const TOTAL_POSTS_QUERY = (categories: string[], bounds: { south: number, west: number, north: number, east: number }) => {
    const categoryFilter = categories.length > 0 ? `&& count((categories[]->slug.current)[@ in [${categories.map(cat => `"${cat}"`).join(', ')}]]) > 0` : '';
    const boundsFilter = bounds ? `&& location.lat >= ${bounds.south} && location.lat <= ${bounds.north} && location.lng >= ${bounds.west} && location.lng <= ${bounds.east}` : '';
    return `count(*[_type == "post" ${categoryFilter} ${boundsFilter}])`;
  };

  const url = new URL(req.url || '', `https://${req.headers.host}`);
  console.log(url);
  const bounds = url.searchParams.get('bounds') ? JSON.parse(url.searchParams.get('bounds')!) : null;
  const page = url.searchParams.get('page') || '1';
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') || POSTS_COUNT.toString()) : POSTS_COUNT;
  const pageNumber = parseInt(page);
  const categories = url.searchParams.get('categories') ? url.searchParams.get('categories')!.split(',') : [];
  console.log(categories);

  try {
    const posts = await sanityAllPosts({
      query: EVENTS_QUERY(pageNumber, limit, categories, bounds),
    });
    const totalPosts = await sanityAllPosts({
      query: TOTAL_POSTS_QUERY(categories, bounds),
    });

    res.status(200).json({ posts, totalPosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
