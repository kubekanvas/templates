import Link from 'next/link';
import { BlogPost } from '../lib/strapi';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { title, description, slug, publishedAt } = post;
  
  // Format date
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Extract preview text (first 150 characters)
  const preview = description && description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description || '';

  return (
    <article className="group bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Article
          </span>
          <time className="text-gray-500 text-sm" dateTime={publishedAt}>
            {date}
          </time>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link 
            href={`/blog/${slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h2>
        
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {preview}
        </p>
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/blog/${slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
          >
            Read more 
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
