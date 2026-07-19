import type { Metadata } from 'next'
import PageTemplate from './[slug]/page'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug?: string
  }>
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

// Completely standalone metadata handler for the home page wrapper
export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  try {
    const page = await queryPageBySlug({
      slug: 'home',
    })
    return generateMeta({ doc: page })
  } catch (error) {
    return { title: 'KubeKanvas App' }
  }
}

export default PageTemplate