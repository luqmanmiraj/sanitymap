import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'season',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'season'}})],
    }),
    defineField({
      name: 'budget',
      type: 'string',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Low-cost', value: 'low-cost'},
          {title: 'Medium', value: 'medium'},
          {title: 'High', value: 'high'},
        ],
      },
    }),
    defineField({
      name: 'accessibility',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'accessibility'}})],
    }),
    defineField({
      name: 'language',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'language'}})],
    }),
    defineField({
      name: 'explorer',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'explorer'}})],
    }),
    defineField({
      name: 'participant',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'participant'}})],
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
    }),
    defineField({
      name: 'location', 
      type: 'geopoint',
      title: 'Location',
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Address',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
