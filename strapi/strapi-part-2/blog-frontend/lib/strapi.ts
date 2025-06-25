import { GraphQLClient, gql } from 'graphql-request';

// GraphQL client configuration with Authorization header
const getGraphQLClient = () => {
  const headers: Record<string, string> = {};
  
  if (process.env.NEXT_PUBLIC_STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;
  }
  
  return new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
    headers,
  });
};

// Updated interface to match the actual Strapi schema
export interface BlogPost {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticlesConnection {
  nodes: BlogPost[];
  pageInfo: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Fragment for article fields
const ARTICLE_FRAGMENT = gql`
  fragment ArticleFields on Article {
    documentId
    title
    description
    slug
    publishedAt
    createdAt
    updatedAt
  }
`;

// GraphQL query to fetch all blog posts using articles_connection
const GET_BLOG_POSTS = gql`
  ${ARTICLE_FRAGMENT}
  query GetBlogPosts {
    articles_connection {
      nodes {
        ...ArticleFields
      }
      pageInfo {
        page
        pageSize
        pageCount
        total
      }
    }
  }
`;

// GraphQL query to fetch a single blog post by slug
const GET_BLOG_POST_BY_SLUG = gql`
  ${ARTICLE_FRAGMENT}
  query GetBlogPostBySlug($slug: String!) {
    articles_connection(filters: { slug: { eq: $slug } }) {
      nodes {
        ...ArticleFields
      }
    }
  }
`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const client = getGraphQLClient();
    const response: { articles_connection: ArticlesConnection } = await client.request(GET_BLOG_POSTS);
    return response.articles_connection.nodes || [];
  } catch (error) {
    console.error('Error fetching blog posts with GraphQL:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const client = getGraphQLClient();
    const response: { articles_connection: ArticlesConnection } = await client.request(GET_BLOG_POST_BY_SLUG, { slug });
    const nodes = response.articles_connection.nodes;
    return nodes.length > 0 ? nodes[0] : null;
  } catch (error) {
    console.error('Error fetching blog post with GraphQL:', error);
    return null;
  }
}
