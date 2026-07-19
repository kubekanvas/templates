import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'

// Force dynamic execution at runtime instead of static compilation inside Docker
export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// 1. Comment out generateStaticParams to bypass build-time database evaluation entirely
/*
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs?.map(({ slug }) => ({ slug })) || []
}
*/

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  
  let post: any = null

  // 2. Wrap the dynamic fetch loop inside a try/catch guard block
  try {
    post = await queryPostBySlug({ slug: decodedSlug })
  } catch (error) {
    console.warn(`Skipping individual post database fetch for slug "${decodedSlug}" during Docker build phase.`)
  }

  if (!post) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article className="container py-16 prose dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      {/* Render your post content, blocks, or rich text elements here */}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  
  try {
    const post = await queryPostBySlug({ slug: decodedSlug })
    return generateMeta({ doc: post })
  } catch (error) {
    return { title: 'Post Detail | KubeKanvas' }
  }
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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