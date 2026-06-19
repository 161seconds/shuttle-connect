export type UserRole = "PLAYER" | "HOST" | "ADMIN";
export type SourceType = "MANUAL" | "FACEBOOK_IMPORT" | "PAGE_API_PLACEHOLDER";
export type PostStatus = "OPEN" | "FULL" | "EXPIRED" | "PENDING" | "APPROVED" | "REJECTED" | "DUPLICATE";

export interface GamePost {
  id: string;
  courtName: string;
  address: string;
  district: string;
  playDate: string;
  startTime: string;
  endTime: string;
  skillLevel: string;
  slotsNeeded: number;
  price: number;
  hostName: string;
  contactInfo: string;
  description: string;
  sourceType: SourceType;
  status: PostStatus;
  originalText?: string;
  confidenceScore?: number;
  missingFields?: string[];
  createdAt: string;
}

export interface ParsedFacebookPost {
  courtName?: string;
  address?: string;
  district?: string;
  playDate?: string;
  startTime?: string;
  endTime?: string;
  skillLevel?: string;
  slotsNeeded?: number;
  price?: number;
  contactInfo?: string;
  confidenceScore: number;
  missingFields: string[];
}
