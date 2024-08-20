import {defineField, defineType} from 'sanity'

export const seasonType = defineType({
  name: 'season',
  title: 'Seasons',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'startDate',
      type: 'datetime',
      title: 'Start Date',
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End Date',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
  ],
})
