import { GamePost } from '../types';

// In-memory mock database for MVP
export const mockPosts: GamePost[] = [
  {
    id: "1",
    courtName: "Sân TADA",
    address: "129 Bình Quới",
    district: "Bình Thạnh",
    playDate: new Date().toISOString().split('T')[0],
    startTime: "19:00",
    endTime: "21:00",
    skillLevel: "TB Khá",
    slotsNeeded: 2,
    price: 80000,
    hostName: "Nguyễn Văn A",
    contactInfo: "0901234567",
    description: "Nhóm vui vẻ hòa đồng",
    sourceType: "MANUAL",
    status: "APPROVED",
    createdAt: new Date().toISOString()
  }
];
