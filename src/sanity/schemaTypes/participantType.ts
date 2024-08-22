import {defineField, defineType} from 'sanity'

export const participantType = defineType({
  name: 'participant',
  title: 'Participant',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
  ],
})
