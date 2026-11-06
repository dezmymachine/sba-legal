// ── SBA Legal Consult — Knowledge posts (Publications / News / Events) ───────
// The website's GROQ in `../../src/lib/sanity.ts` is written against exactly these
// field names — do not rename fields without updating the queries.

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'display', title: 'Display'},
    {name: 'seo', title: 'Search'},
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
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              description: 'Describe the image for screen readers and search engines.',
              type: 'string',
            }),
          ],
        },
        // From @sanity/table: the first row renders as the table header on the site.
        {type: 'table'},
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
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          description: 'Describe the image for screen readers and search engines.',
          type: 'string',
        }),
      ],
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
      validation: (r) => r.max(160).warning('Keep it under 160 characters so search results show it in full.'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Search title',
      description: 'Optional. Overrides the heading in Google results. Aim for 50–60 characters.',
      type: 'string',
      group: 'seo',
      validation: (r) => r.max(65).warning('Google usually cuts titles longer than ~60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search description',
      description: 'Optional. Overrides the excerpt in Google results. Aim for 120–160 characters.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (r) => r.max(160).warning('Google usually cuts descriptions longer than ~160 characters.'),
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
