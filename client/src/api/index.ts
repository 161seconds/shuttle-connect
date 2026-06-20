import type { GamePost, SearchFilters, ParsedFacebookPost, PostStatus } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Fetch posts with optional filters
  getPosts: async (filters?: SearchFilters): Promise<GamePost[]> => {
    const queryParams = new URLSearchParams();
    if (filters?.district) queryParams.append('district', filters.district);
    if (filters?.date) queryParams.append('date', filters.date);
    if (filters?.skillLevel) queryParams.append('skillLevel', filters.skillLevel);

    const url = `${API_BASE_URL}/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    let posts: GamePost[] = await response.json();
    
    // Client-side filtering for slots and maxPrice since backend doesn't support them yet
    if (filters?.maxPrice) {
      posts = posts.filter(post => post.price <= filters.maxPrice!);
    }
    if (filters?.availableSlotsOnly) {
      posts = posts.filter(post => post.slotsNeeded > 0);
    }
    
    return posts;
  },

  // Create a new post
  createPost: async (postData: Partial<GamePost>): Promise<GamePost> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  // Update post status
  updatePostStatus: async (id: string, status: PostStatus): Promise<GamePost> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update status');
    return response.json();
  },

  // Parse Facebook post
  parseFacebookPost: async (text: string): Promise<ParsedFacebookPost> => {
    const response = await fetch(`${API_BASE_URL}/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error('Failed to parse post');
    return response.json();
  }
};
