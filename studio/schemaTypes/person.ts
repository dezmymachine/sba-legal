// ── SBA Legal Consult — Article authors ──────────────────────────────────────
// The `person` type exists so articles can reference an author (photo, name and
// title render in the article sidebar). The People pages on the website are still
// managed in code (`PEOPLE` in `src/data/content.ts`), so a person's slug here must
// match their slug there for the author link to resolve.

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Designation',
      description: 'e.g. Managing Partner, Associate.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Must match the person\'s profile URL on the website, e.g. ezekiel-osei.',
      options: {source: 'name', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Portrait',
      description: 'Portrait photo, ideally 3:4 (e.g. 900 × 1200px).',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'title', media: 'photo'},
  },
})
