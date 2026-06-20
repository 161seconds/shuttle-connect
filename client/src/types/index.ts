export type UserRole = "PLAYER" | "HOST" | "ADMIN";
export type SourceType = "MANUAL" | "FACEBOOK_IMPORT" | "PAGE_API_PLACEHOLDER";
export type PostStatus = "OPEN" | "FULL" | "EXPIRED" | "PENDING" | "APPROVED" | "REJECTED" | "DUPLICATE";
export type SkillLevel = "Yếu" | "Trung bình" | "Trung bình khá" | "Khá" | "Cứng" | "Tất cả";

export interface GamePost {
  id: string;
  courtName: string;
  address: string;
  district: string;
  playDate: string; // YYYY-MM-DD or readable string
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  skillLevel: SkillLevel | string;
  slotsNeeded: number;
  price: number;
  hostName: string;
  contactInfo: string;
  description: string;
  sourceType: SourceType;
  status: PostStatus;
  
  // UI-specific helpers based on the image
  dateLabel?: string;
  slotsText?: string;
}

export interface ParsedFacebookPost {
  courtName?: string;
  address?: string;
  district?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  timeRange?: string;
  slotsNeeded?: number;
  price?: number;
  skillLevel?: string;
  contactInfo?: string;
  confidenceScore: number;
  missingFields: string[];
}

export interface SearchFilters {
  district?: string;
  date?: string;
  timeRange?: string;
  skillLevel?: string;
  maxPrice?: number;
  availableSlotsOnly?: boolean;
}
