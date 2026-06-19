import { Request, Response } from 'express';
import { mockPosts } from '../models/mockData';
import { GamePost, PostStatus } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getPosts = (req: Request, res: Response) => {
  const { district, date, skillLevel, status } = req.query;
  
  let filteredPosts = [...mockPosts];

  if (district) {
    filteredPosts = filteredPosts.filter(p => p.district.toLowerCase().includes((district as string).toLowerCase()));
  }
  if (date) {
    filteredPosts = filteredPosts.filter(p => p.playDate === date);
  }
  if (skillLevel) {
    filteredPosts = filteredPosts.filter(p => p.skillLevel.toLowerCase() === (skillLevel as string).toLowerCase());
  }
  if (status) {
    filteredPosts = filteredPosts.filter(p => p.status === status);
  }

  res.status(200).json(filteredPosts);
};

export const getPostById = (req: Request, res: Response) => {
  const post = mockPosts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
};

export const createPost = (req: Request, res: Response) => {
  const newPost: GamePost = {
    ...req.body,
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: req.body.status || 'PENDING'
  };

  mockPosts.push(newPost);
  res.status(201).json(newPost);
};

export const updatePostStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: PostStatus };

  const postIndex = mockPosts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  mockPosts[postIndex].status = status;
  res.status(200).json(mockPosts[postIndex]);
};
