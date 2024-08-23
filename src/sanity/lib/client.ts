import "server-only"
import { createClient , type QueryParams} from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});


export async function sanityAllPosts<const QueryString extends string>({
  query,
  params = {},
  tags,
}: {
  query: QueryString;
  params?: QueryParams;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  });
}
