import { NextApiRequest, NextApiResponse } from 'next';
import { sanityAllPosts } from '../../src/sanity/lib/client';
// const POSTS_COUNT = 6;
const EVENTS_QUERY = `*[_type == "post"]{
  ...,
  "imageUrl": mainImage.asset->url
}`;
const TOTAL_POSTS_QUERY = `count(*[_type == "post"])`;
// const CATEGORIES_QUERY = `*[_type == "category" && (!defined(parentCategory) || parentCategory == null)]{title, slug, _id}`;
const CATEGORIES_QUERY = `*[_type == "category" && (!defined(parentCategory) || parentCategory == null)]| order(sortorder asc){
  ...,
  "childCategories": *[_type == "category" && parentCategory._ref == ^._id]| order(sortorder asc){
    ...
  }
}`;
const ACCESSIBILITY_QUERY = `*[_type == "accessibility"]{title, _id}`;  
const LANGUAGES_QUERY = `*[_type == "language"]{title, _id}`;
const EXPLORERS_QUERY = `*[_type == "explorer"]{title, _id}`;
const PARTICIPANT_QUERY = `*[_type == "participant"]{title, _id}`;
const SEASONS_QUERY = `*[_type == "season"]{name, _id}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = new URL(req.url || '', `https://${req.headers.host}`);
    console.log(url);
    const lat = url.searchParams.get('lat');
    const lng = url.searchParams.get('lng');
  try {
    const posts = await sanityAllPosts({
      query: EVENTS_QUERY,
    });
    const totalPosts = await sanityAllPosts({
      query: TOTAL_POSTS_QUERY,
    });
    const categories = await sanityAllPosts({
      query: CATEGORIES_QUERY,
    });
    const accessibility = await sanityAllPosts({
      query: ACCESSIBILITY_QUERY,
    });
    const languages = await sanityAllPosts({
      query: LANGUAGES_QUERY,
    });
    const explorers = await sanityAllPosts({
      query: EXPLORERS_QUERY,
    });
    const participants = await sanityAllPosts({
      query: PARTICIPANT_QUERY,
    });
    const seasons = await sanityAllPosts({
      query: SEASONS_QUERY,
    });
    res.status(200).json({ posts, totalPosts, categories, accessibility, languages, explorers, participants, seasons });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
