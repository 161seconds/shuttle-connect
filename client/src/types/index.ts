export type UserRole = 'Player' | 'Host' | 'Admin';

export type SourceType = 'Manual' | 'Facebook Import' | 'Page API Placeholder';

export type PostStatus = 'Open' | 'Full' | 'Expired';

export interface Host {
  id: string;
  name: string;
  isVerified: boolean;
  avatarUrl?: string;
}

export interface Court {
  id: string;
  name: string;
  address: string;
  district: string;
  lat?: number;
  lng?: number;
}

export interface GamePost {
  id: string;
  court: Court;
  date: string; // ISO format or YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  skillLevel: string;
  slotsNeeded: number;
  price: number;
  host: Host;
  source: SourceType;
  status: PostStatus;
  contactInfo: string;
  description?: string;
  createdAt: string;
}

export interface SearchFilters {
  district?: string;
  date?: string;
  timeRange?: [string, string];
  skillLevel?: string;
  maxPrice?: number;
  availableSlotsOnly?: boolean;
}

export interface ParsedFacebookPost {
  date?: string;
  timeRange?: string;
  slotsNeeded?: number;
  price?: number;
  skillLevel?: string;
  courtName?: string;
  contactInfo?: string;
  confidenceScore: number;
  missingFields: string[];
}
