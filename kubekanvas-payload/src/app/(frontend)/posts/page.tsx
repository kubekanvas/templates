import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

// Force runtime execution rather than static HTML compilation inside Docker
export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page() {
  // Safe default fallback structure so Next.js doesn't crash during build checks
  let posts = { docs: [], totalDocs: 0, page: 1, totalPages: 1 }

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      page: 1,
      overrideAccess: false,
    })
    
    if (result) {
      posts = result as any
    }
  } catch (error) {
    console.warn('Skipping main posts list database query during isolated Docker compilation phase.')
  }

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Posts Archive | KubeKanvas',
  }
}