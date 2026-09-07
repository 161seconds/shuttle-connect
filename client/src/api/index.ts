import { mockPosts } from '../data/mockPosts';
import type { GamePost, NewGamePost, PostStatus, SearchFilters } from '../types';

const STORAGE_KEY = 'shuttle_connect_posts_v2';
const cloneSeed = () => mockPosts.map((post) => ({ ...post }));

const read = (): GamePost[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    const seed = cloneSeed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed as GamePost[] : [];
  } catch {
    return [];
  }
};

const write = (posts: GamePost[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

export const postsApi = {
  list(filters?: SearchFilters) {
    return read().filter((post) => {
      if (!['OPEN', 'APPROVED'].includes(post.status)) return false;
      if (filters?.district && post.district !== filters.district) return false;
      if (filters?.date && post.playDate !== filters.date) return false;
      if (filters?.skillLevel && post.skillLevel !== filters.skillLevel) return false;
      if (filters?.startTime && post.startTime < filters.startTime) return false;
      if (filters?.endTime && post.endTime > filters.endTime) return false;
      if (filters?.maxPrice && post.price > Number(filters.maxPrice)) return false;
      if (filters?.availableSlotsOnly && post.slotsNeeded < 1) return false;
      return true;
    });
  },
  listAll: read,
  listByOwner(ownerId: string) {
    return read().filter((post) => post.ownerId === ownerId);
  },
  create(input: NewGamePost) {
    const post: GamePost = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    write([post, ...read()]);
    return post;
  },
  updateStatus(id: string, status: PostStatus) {
    const posts = read();
    const post = posts.find((item) => item.id === id);
    if (!post) throw new Error('Không tìm thấy bài đăng');
    post.status = status;
    write(posts);
  },
  remove(id: string, ownerId: string) {
    const posts = read();
    const post = posts.find((item) => item.id === id);
    if (!post || post.ownerId !== ownerId) throw new Error('Không có quyền xóa bài đăng');
    write(posts.filter((item) => item.id !== id));
  },
  reset() {
    const seed = cloneSeed();
    write(seed);
    return seed;
  },
};
