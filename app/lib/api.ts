import { GraphQLClient, gql } from 'graphql-request';

// Define the shape of a single post node (the data we expect for each post)
export interface PostNode {
  title: string;
  slug: string;
  excerpt: string;
  uri: string;
}

// Define the overall GraphQL response structure
// 'posts' can be optional, but if it exists, 'nodes' inside it is an array of PostNode
export interface GraphQLResponse {
  posts?: {
    nodes: PostNode[];
  };
}

// Get the WordPress API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in environment variables');
}

const client = new GraphQLClient(apiUrl);

// GraphQL query to fetch all posts
export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        title
        slug
        excerpt
        uri
      }
    }
  }
`;

// Function to execute any GraphQL query, ensuring it returns a Promise of GraphQLResponse
export async function fetchGraphQL(query: string, variables = {}): Promise<GraphQLResponse> {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.error('Error fetching GraphQL:', error);
    throw new Error('Failed to fetch data from WordPress. Please check the API URL and WordPress status.');
  }
}

// Function to get all published post data, explicitly returning a Promise of PostNode[]
export async function getAllPosts(): Promise<PostNode[]> { // <--- IMPORTANT: Type the return of this function
  const data = await fetchGraphQL(GET_ALL_POSTS);
  // Safely access nodes, ensuring it's an array or defaults to empty array
  return data?.posts?.nodes || [];
}