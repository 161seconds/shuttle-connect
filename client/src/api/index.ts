import type { GamePost, SearchFilters, ParsedFacebookPost, PostStatus } from '../types';
import { mockGames } from '../data/mockGames';
import { parseFacebookPost as parseText } from '../utils/postParser';

const STORAGE_KEY = 'shuttle_connect_posts';

// Initialize storage with mock data if not already populated
const initializeStorage = (): GamePost[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading from localStorage', err);
  }
  // Default to mock data
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockGames));
  } catch (err) {
    console.error('Error saving to localStorage', err);
  }
  return mockGames;
};

export const api = {
  // Fetch posts with flexible filtering
  getPosts: async (filters?: SearchFilters & { status?: PostStatus; includeAllStatuses?: boolean }): Promise<GamePost[]> => {
    // Artificial slight micro-delay for realistic UI feedback
    await new Promise(resolve => setTimeout(resolve, 50));
    
    let posts = initializeStorage();

    if (filters) {
      // District filter
      if (filters.district && filters.district.trim() !== '') {
        const searchDist = filters.district.toLowerCase().trim();
        posts = posts.filter(post => 
          post.district.toLowerCase().includes(searchDist) ||
          post.address.toLowerCase().includes(searchDist)
        );
      }

      // Date filter
      if (filters.date && filters.date.trim() !== '') {
        posts = posts.filter(post => post.playDate === filters.date);
      }

      // Skill Level filter
      if (filters.skillLevel && filters.skillLevel.trim() !== '' && filters.skillLevel !== 'Tất cả') {
        const searchSkill = filters.skillLevel.toLowerCase().trim();
        posts = posts.filter(post => post.skillLevel.toLowerCase().includes(searchSkill));
      }

      // Max price filter
      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        posts = posts.filter(post => post.price <= filters.maxPrice!);
      }

      // Available slots only
      if (filters.availableSlotsOnly) {
        posts = posts.filter(post => post.slotsNeeded > 0 && post.status === 'OPEN');
      }

      // Status filter
      if (filters.status) {
        posts = posts.filter(post => post.status === filters.status);
      } else if (!filters.includeAllStatuses) {
        // By default, for explore page, only show OPEN or APPROVED posts
        posts = posts.filter(post => post.status === 'OPEN' || post.status === 'APPROVED');
      }
    } else {
      // Default: show active open games
      posts = posts.filter(post => post.status === 'OPEN' || post.status === 'APPROVED');
    }

    return posts;
  },

  // Fetch all posts without status restriction (for Host/Admin dashboards)
  getAllPosts: async (): Promise<GamePost[]> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return initializeStorage();
  },

  // Create a new post
  createPost: async (postData: Partial<GamePost>): Promise<GamePost> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const posts = initializeStorage();
    
    const newPost: GamePost = {
      id: `g_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      courtName: postData.courtName || 'Sân Cầu Lông',
      address: postData.address || 'TP. Hồ Chí Minh',
      district: postData.district || 'Quận 1',
      playDate: postData.playDate || new Date().toISOString().split('T')[0],
      startTime: postData.startTime || '19:00',
      endTime: postData.endTime || '21:00',
      skillLevel: postData.skillLevel || 'Trung bình',
      slotsNeeded: Number(postData.slotsNeeded) || 1,
      price: Number(postData.price) || 80000,
      hostName: postData.hostName || 'Chủ sân',
      contactInfo: postData.contactInfo || '0909 123 456',
      description: postData.description || '',
      sourceType: postData.sourceType || 'MANUAL',
      status: postData.status || 'OPEN',
      dateLabel: postData.dateLabel || 'Hôm nay',
      slotsText: `Còn ${postData.slotsNeeded || 1} slot`,
      originalText: postData.originalText,
      confidenceScore: postData.confidenceScore,
      missingFields: postData.missingFields,
      lat: postData.lat || (10.75 + Math.random() * 0.08),
      lng: postData.lng || (106.65 + Math.random() * 0.08)
    };

    const updated = [newPost, ...posts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newPost;
  },

  // Update post status (e.g. APPROVED, REJECTED, DUPLICATE, FULL, OPEN)
  updatePostStatus: async (id: string, status: PostStatus): Promise<GamePost> => {
    await new Promise(resolve => setTimeout(resolve, 80));
    const posts = initializeStorage();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');

    const updatedPost = { ...posts[index], status };
    posts[index] = updatedPost;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return updatedPost;
  },

  // Delete post
  deletePost: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 80));
    const posts = initializeStorage();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Parse Facebook post text into structured data
  parseFacebookPost: async (text: string): Promise<ParsedFacebookPost> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return parseText(text);
  },

  // Restore initial mock data
  resetMockData: async (): Promise<GamePost[]> => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockGames));
    return mockGames;
  }
};

