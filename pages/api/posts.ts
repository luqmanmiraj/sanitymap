import { NextApiRequest, NextApiResponse } from 'next';
import { sanityAllPosts } from '../../src/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const EVENTS_QUERY = (page: number, categories: string[], bounds: { south: number, west: number, north: number, east: number },query:string | null) => {
    const categoryFilter = categories.length > 0 ? `&& count((categories[]->slug.current)[@ in [${categories.map(cat => `"${cat}"`).join(', ')}]]) > 0` : '';
    const boundsFilter = bounds ? `&& location.lat >= ${bounds.south} && location.lat <= ${bounds.north} && location.lng >= ${bounds.west} && location.lng <= ${bounds.east}` : '';
    const queryFilter = query ? `&& title match "*${query}*"` : ''; 
    const squery = `*[_type == "post" ${categoryFilter} ${boundsFilter} ${queryFilter}]{
      ...,
      "categoryDetail": categories[]->{ ..., "parentCategory": parentCategory-> },
      "imageUrl": mainImage.asset->url,
      "Explorer": explorer[]->title,
      "Accessibility": accessibility[]->title,
      "Language": language[]->title,
      "Cuisine": cuisine[]->title,
      "Cravings": cravings[]->title,
    }`;

    return squery;
  };
  const TOTAL_POSTS_QUERY = (categories: string[], bounds: { south: number, west: number, north: number, east: number },query:string | null) => {
    const categoryFilter = categories.length > 0 ? `&& count((categories[]->slug.current)[@ in [${categories.map(cat => `"${cat}"`).join(', ')}]]) > 0` : '';
    const boundsFilter = bounds ? `&& location.lat >= ${bounds.south} && location.lat <= ${bounds.north} && location.lng >= ${bounds.west} && location.lng <= ${bounds.east}` : '';
    const queryFilter = query ? `&& title match "*${query}*"` : ''; 
    return `count(*[_type == "post" ${categoryFilter} ${boundsFilter} ${queryFilter}])`;
  };

  const url = new URL(req.url || '', `https://${req.headers.host}`);
  const bounds = url.searchParams.get('bounds') ? JSON.parse(url.searchParams.get('bounds')!) : null;
  const page = url.searchParams.get('page') || '1';
  const pageNumber = parseInt(page);
  const categories = url.searchParams.get('categories') ? url.searchParams.get('categories')!.split(',') : [];
  const query=url.searchParams.get('query') ? url.searchParams.get('query') : '';

  try {
    const posts = await sanityAllPosts({
      query: EVENTS_QUERY(pageNumber, categories, bounds,query),
    });
    const totalPosts = await sanityAllPosts({
      query: TOTAL_POSTS_QUERY(categories, bounds,query),
    });

    res.status(200).json({ posts, totalPosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
