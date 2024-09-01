import {defineType} from 'sanity'

export const cuisineType = defineType({
  name: 'cuisine',
  title: 'Cuisine',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
  ],
})