// Copies the website's team (`PEOPLE` in src/data/content.ts) into Sanity as
// `person` docs so editors can pick article authors. Safe to re-run: documents
// use fixed IDs and identical portraits are de-duplicated by Sanity.
// Run from studio/: npx sanity exec scripts/seed-people.ts --with-user-token
import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {PEOPLE} from '../../src/data/content'

const client = getCliClient({apiVersion: '2026-01-01'})

async function main() {
  for (const p of PEOPLE) {
    const file = resolve(process.cwd(), '..', 'public', p.image.replace(/^\//, ''))
    const asset = await client.assets.upload('image', createReadStream(file), {
      filename: basename(file),
    })
    // No dots in IDs: dotted IDs are private and invisible to the website's public reads.
    await client.createOrReplace({
      _id: `person-${p.slug}`,
      _type: 'person',
      name: p.name,
      title: p.title,
      slug: {_type: 'slug', current: p.slug},
      photo: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
    })
    console.log(`✓ ${p.name} — ${p.title}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
