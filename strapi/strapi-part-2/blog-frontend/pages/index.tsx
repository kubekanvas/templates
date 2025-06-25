import { GetStaticProps } from 'next';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import { BlogPost, getBlogPosts } from '../lib/strapi';

interface HomePageProps {
  posts: BlogPost[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <Layout>
      <div className="space-y-12">
        {posts.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Latest Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.documentId} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            No Articles found
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBlogPosts();
  
  return {
    props: {
      posts,
    },
  };
};
