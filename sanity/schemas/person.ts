// ── SBA Legal Consult — Sanity Studio schemas ────────────────────────────────
// Companion to article.ts: the `person` type exists so articles can reference
// an author (photo, name, and title render in the article sidebar).
// Field names match the person GROQ already used in `src/lib/sanity.ts`
// (name, title, slug, photo, featured, excerpt, focus, bio).
// Requires the `sanity` package (present in any studio, NOT in this website).

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
      description: 'e.g. Managing Partner, Partner, Associate.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
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
    defineField({
      name: 'featured',
      title: 'Show on website',
      description: 'Only featured people appear on the homepage and People page.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'focus',
      title: 'Focus areas',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'title', media: 'photo'},
  },
})
