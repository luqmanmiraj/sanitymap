import {defineField, defineType} from 'sanity'

export const accessibilityType = defineType({
  name: 'accessibility',
  title: 'Accessibility',
  type: 'document',
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
        maxLength: 96,
      },
    }),
  ],
})
