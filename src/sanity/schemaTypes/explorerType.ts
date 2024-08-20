import {defineField, defineType} from 'sanity'

export const explorerType = defineType({
  name: 'explorer',
  title: 'Explorer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
})
