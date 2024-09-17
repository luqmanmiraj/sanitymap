import { NextApiRequest, NextApiResponse } from 'next';
import { sanityAllPosts } from '../../src/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const EVENTS_QUERY = (page: number, categories: string[], bounds: { south: number, west: number, north: number, east: number },query:string | null,season:string | null, travellers: string[]) => {
    const categoryFilter = categories.length > 0 ? `&& count((categories[]->slug.current)[@ in [${categories.map(cat => `"${cat}"`).join(', ')}]]) > 0` : '';
    const boundsFilter = bounds ? `&& location.lat >= ${bounds.south} && location.lat <= ${bounds.north} && location.lng >= ${bounds.west} && location.lng <= ${bounds.east}` : '';
    const queryFilter = query ? `&& title match "*${query}*"` : ''; 
    const seasonFilter = season ? `&& "${season}" in season[]->name` : '';
    const travellersFilter = travellers.length > 0 ? `&& count(participant[]->title[@ in [${travellers.map(traveller => `"${traveller}"`).join(', ')}]]) > 0` : '';
    const squery = `*[_type == "post" ${categoryFilter} ${boundsFilter} ${queryFilter} ${seasonFilter} ${travellersFilter}  ]{
      ...,
      "categoryDetail": categories[]->{ ..., "parentCategory": parentCategory-> },
      "imageUrl": mainImage.asset->url,
      "Explorer": explorer[]->title,
      "Accessibility": accessibility[]->title,
      "Language": language[]->title,
      "Cuisine": cuisine[]->title,
      "Cravings": cravings[]->title,
      "season": season[]->name,
      "participant": participant[]->title,
    }`;
    
    return squery;
  };
  

  const url = new URL(req.url || '', `https://${req.headers.host}`);
  const bounds = url.searchParams.get('bounds') ? JSON.parse(url.searchParams.get('bounds')!) : null;
  const page = url.searchParams.get('page') || '1';
  const pageNumber = parseInt(page);
  const categories = url.searchParams.get('categories')?.split(',') || [];
  const season = url.searchParams.get('season') ? url.searchParams.get('season')!.charAt(0).toUpperCase() + url.searchParams.get('season')!.slice(1) : '';
  const travellers = url.searchParams.get('travellers')?.split(',').map(traveller => traveller.charAt(0).toUpperCase() + traveller.slice(1)) || []; 
  const query = url.searchParams.get('query') || '';
  try {
    const posts = await sanityAllPosts({
      query: EVENTS_QUERY(pageNumber, categories, bounds, query, season, travellers),
    });

    const filteredPosts = posts.filter((post: any) => 
      post.participant.some((p: any) => travellers.includes(p))
    );
    res.status(200).json({ posts: filteredPosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
