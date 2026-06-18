import type { GamePost } from '../types';

export const mockPosts: GamePost[] = [
  {
    id: '1',
    court: {
      id: 'c1',
      name: 'Phu Tho Stadium',
      address: '219 Ly Thuong Kiet',
      district: 'District 11',
      lat: 10.7725,
      lng: 106.6579,
    },
    date: new Date().toISOString().split('T')[0],
    startTime: '18:00',
    endTime: '20:00',
    skillLevel: 'trung bình',
    slotsNeeded: 2,
    price: 80000,
    host: {
      id: 'h1',
      name: 'Nguyen Van A',
      isVerified: true,
    },
    source: 'Manual',
    status: 'Open',
    contactInfo: '0901234567',
    description: 'Looking for 2 more players. Shuttlecock provided.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    court: {
      id: 'c2',
      name: 'Hoang Hoa Tham Court',
      address: 'Hoang Hoa Tham',
      district: 'Tan Binh',
    },
    date: new Date().toISOString().split('T')[0],
    startTime: '19:00',
    endTime: '22:00',
    skillLevel: 'khá',
    slotsNeeded: 1,
    price: 100000,
    host: {
      id: 'h2',
      name: 'Tran Thi B',
      isVerified: false,
    },
    source: 'Facebook Import',
    status: 'Open',
    contactInfo: '0912345678',
    description: 'Join our weekly intensive group.',
    createdAt: new Date().toISOString()
  }
];
