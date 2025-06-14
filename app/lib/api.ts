import { GraphQLClient, gql } from 'graphql-request';

interface GraphQLResponse {
  posts?: {
    nodes: {
      title: string;
      slug: string;
      excerpt: string;
      uri: string;
    }[];
  };
}

// Get the WordPress API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in environment variables');
}

const client = new GraphQLClient(apiUrl);

// GraphQL query to fetch all posts
// We request 'title', 'slug', 'excerpt', and 'uri' for each post.
export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100, where: { status: PUBLISH }) { # Fetch up to 100 published posts
      nodes {
        title
        slug
        excerpt
        uri
      }
    }
  }
`;

// Function to execute any GraphQL query
export async function fetchGraphQL(query: string, variables = {}): Promise<GraphQLResponse> { // Add : Promise<GraphQLResponse>
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.error('Error fetching GraphQL:', error);
    throw new Error('Failed to fetch data from WordPress. Please check the API URL and WordPress status.');
  }
}

// Function to get all published post data
export async function getAllPosts() {
  const data = await fetchGraphQL(GET_ALL_POSTS);
  // Ensure data.posts.nodes exists before returning
  return data?.posts?.nodes || [];
}