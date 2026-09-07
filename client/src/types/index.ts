export type UserRole = 'PLAYER' | 'HOST' | 'ADMIN';
export type SourceType = 'MANUAL' | 'FACEBOOK_IMPORT' | 'PAGE_API_PLACEHOLDER';
export type PostStatus = 'OPEN' | 'FULL' | 'EXPIRED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'DUPLICATE';
export type SkillLevel = 'Yếu' | 'Trung bình' | 'Trung bình khá' | 'Khá' | 'Cứng' | 'Giao lưu';

export interface GamePost {
  id: string;
  ownerId: string;
  courtName: string;
  address: string;
  district: string;
  playDate: string;
  startTime: string;
  endTime: string;
  skillLevel: SkillLevel;
  slotsNeeded: number;
  price: number;
  hostName: string;
  contactInfo: string;
  description: string;
  sourceType: SourceType;
  status: PostStatus;
  lat: number;
  lng: number;
  createdAt: string;
  originalText?: string;
  confidenceScore?: number;
  missingFields?: string[];
}

export interface ParsedFacebookPost {
  courtName?: string;
  address?: string;
  district?: string;
  playDate?: string;
  startTime?: string;
  endTime?: string;
  slotsNeeded?: number;
  price?: number;
  skillLevel?: SkillLevel;
  contactInfo?: string;
  confidenceScore: number;
  missingFields: string[];
  originalText: string;
}

export interface SearchFilters {
  district: string;
  date: string;
  startTime: string;
  endTime: string;
  skillLevel: string;
  maxPrice: string;
  availableSlotsOnly: boolean;
}

export type NewGamePost = Omit<GamePost, 'id' | 'createdAt'>;
