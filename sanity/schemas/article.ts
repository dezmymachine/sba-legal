// ── SBA Legal Consult — Sanity Studio schemas ────────────────────────────────
// HOW TO USE: these files are drop-in schemas for a Sanity v3 studio.
//   1. `npx sanity@latest init` (clean project, no predefined schemas)
//   2. Copy this `sanity/` folder's `schemas/*.ts` into the studio's `schemaTypes/`
//      and add them to the `types` array in `schemaTypes/index.ts`:
//        import article from './article'
//        import person from './person'
//        export const schemaTypes = [article, person]
//   3. `npm run dev` in the studio, publish documents, then set
//      PUBLIC_SANITY_PROJECT_ID (+ DATASET) in this website's `.env`.
// The GROQ in `src/lib/sanity.ts` is written against exactly these field names —
// do not rename fields without updating the queries.
// Requires the `sanity` package (present in any studio, NOT in this website).

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'display', title: 'Display'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Section',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Publication', value: 'publication'},
          {title: 'News', value: 'news'},
          {title: 'Event', value: 'event'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content body',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      description: 'Required for publications and news. Optional for events.',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'content',
      validation: (r) =>
        r.custom((value, context) => {
          const kind = (context?.document as {kind?: string} | undefined)?.kind
          if ((kind === 'publication' || kind === 'news') && !value) {
            return 'Author is required for publications and news.'
          }
          return true
        }),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description: 'Large background image used for the article hero (landscape, min 1600px wide).',
      type: 'image',
      options: {hotspot: true},
      group: 'display',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'One or two lines shown on cards and in search previews.',
      type: 'text',
      rows: 2,
      group: 'display',
    }),
  ],
  preview: {
    select: {title: 'title', kind: 'kind', date: 'date', media: 'heroImage'},
    prepare({title, kind, date, media}) {
      const label =
        kind === 'publication' ? 'Publication' : kind === 'news' ? 'News' : kind === 'event' ? 'Event' : ''
      return {title, subtitle: [label, date].filter(Boolean).join(' · '), media}
    },
  },
})
