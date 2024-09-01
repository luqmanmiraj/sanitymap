import {defineType} from 'sanity'

export const cravingType = defineType({
  name: 'craving',
  title: 'Craving',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
  ],
})