import type { GamePost } from '../types';

const localDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const createdAt = new Date().toISOString();

export const mockPosts: GamePost[] = [
  {
    id: 'tada-tonight', ownerId: 'host-demo', courtName: 'Sân TADA', address: '129/8 Bình Quới, Phường 27',
    district: 'Bình Thạnh', playDate: localDate(0), startTime: '19:00', endTime: '21:00',
    skillLevel: 'Trung bình khá', slotsNeeded: 2, price: 80000, hostName: 'Nam Nguyễn',
    contactInfo: '0909123456', description: 'Nhóm đánh vui, cầu Thành Công. Có nước lạnh miễn phí.',
    sourceType: 'MANUAL', status: 'OPEN', lat: 10.8242, lng: 106.7215, createdAt,
  },
  {
    id: 'bach-khoa-tomorrow', ownerId: 'host-demo', courtName: 'Sân Bách Khoa', address: '268 Lý Thường Kiệt, Phường 14',
    district: 'Quận 10', playDate: localDate(1), startTime: '20:00', endTime: '22:00', skillLevel: 'Khá',
    slotsNeeded: 1, price: 90000, hostName: 'Nam Nguyễn', contactInfo: '0909123456',
    description: 'Kèo nhanh, ưu tiên người đánh đôi nam.', sourceType: 'MANUAL', status: 'FULL',
    lat: 10.7735, lng: 106.659, createdAt,
  },
  {
    id: 'gia-dinh-import', ownerId: 'host-demo', courtName: 'Sân Gia Định', address: '2A Phan Đăng Lưu, Phường 6',
    district: 'Bình Thạnh', playDate: localDate(1), startTime: '18:00', endTime: '20:00',
    skillLevel: 'Trung bình khá', slotsNeeded: 1, price: 75000, hostName: 'Nam Nguyễn', contactInfo: '0918234567',
    description: 'Bài nhập thủ công từ Facebook.', sourceType: 'FACEBOOK_IMPORT', status: 'PENDING',
    lat: 10.8015, lng: 106.692, createdAt,
    originalText: 'Mai sân Gia Định Bình Thạnh 18-20h thiếu 1 bạn TB khá, 75k, Zalo 0918234567.',
    confidenceScore: 92, missingFields: [],
  },
  {
    id: 'ky-hoa-today', ownerId: 'host-linh', courtName: 'Sân Kỳ Hòa', address: '238 Ba Tháng Hai, Phường 12',
    district: 'Quận 10', playDate: localDate(0), startTime: '17:30', endTime: '19:30', skillLevel: 'Yếu',
    slotsNeeded: 3, price: 65000, hostName: 'Linh Bùi', contactInfo: '0966332211',
    description: 'Nhóm mới chơi, giao lưu nhẹ nhàng.', sourceType: 'MANUAL', status: 'OPEN',
    lat: 10.772, lng: 106.671, createdAt,
  },
  {
    id: 'celadon-tomorrow', ownerId: 'host-huy', courtName: 'Celadon Sports', address: 'Đường N1, Phường Sơn Kỳ',
    district: 'Tân Phú', playDate: localDate(1), startTime: '20:00', endTime: '22:00',
    skillLevel: 'Trung bình khá', slotsNeeded: 2, price: 85000, hostName: 'Huy Ngô', contactInfo: '0912665544',
    description: 'Thảm tốt, sân thoáng, có chỗ gửi xe.', sourceType: 'MANUAL', status: 'OPEN',
    lat: 10.8035, lng: 106.6185, createdAt,
  },
  {
    id: 'thu-duc-weekend', ownerId: 'host-dung', courtName: 'Sân Hoàng Diệu 2', address: '85 Hoàng Diệu 2, Linh Chiểu',
    district: 'Thủ Đức', playDate: localDate(2), startTime: '19:30', endTime: '21:30', skillLevel: 'Giao lưu',
    slotsNeeded: 2, price: 80000, hostName: 'Dũng Phạm', contactInfo: '0909123459',
    description: 'Kèo sinh viên, vui vẻ, đúng giờ.', sourceType: 'MANUAL', status: 'APPROVED',
    lat: 10.852, lng: 106.762, createdAt,
  },
  {
    id: 'q4-review', ownerId: 'host-hung', courtName: 'Sân Bến Vân Đồn', address: 'Bến Vân Đồn, Phường 1',
    district: 'Quận 4', playDate: localDate(0), startTime: '19:00', endTime: '21:00', skillLevel: 'Trung bình',
    slotsNeeded: 2, price: 70000, hostName: 'Hùng Nguyễn', contactInfo: '0907888999',
    description: 'Bài nhập thủ công từ Facebook.', sourceType: 'FACEBOOK_IMPORT', status: 'PENDING',
    lat: 10.762, lng: 106.698, createdAt,
    originalText: 'Tối nay sân Bến Vân Đồn Q4 19h-21h cần 2 vãng lai trình TB, 70k/người, 0907888999.',
    confidenceScore: 86, missingFields: [],
  },
];
