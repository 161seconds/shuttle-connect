# Shuttle Connect

Frontend MVP giúp người chơi cầu lông tại TP.HCM tìm kèo vãng lai theo khu vực, ngày, giờ, trình độ, giá và số slot.

## Tính năng

- Trang tìm kiếm với bộ lọc và bản đồ VietMap-ready.
- Host đăng kèo thủ công, quản lý bài của chính mình.
- Dán nội dung Facebook thủ công, xem preview parser, tạo bản nháp.
- Admin duyệt, từ chối hoặc đánh dấu bài trùng.
- Mock login theo vai trò; dữ liệu lưu bằng `localStorage`.
- Responsive desktop/mobile; light/dark theme.

## Công nghệ

React, TypeScript, Vite, React Router, plain CSS, Lucide icons, pnpm.

## Chạy dự án

```bash
cd client
pnpm install
pnpm dev
```

## Kiểm tra

```bash
cd client
pnpm lint
pnpm check:parser
pnpm build
```

## Biến môi trường

```env
VITE_VIETMAP_API_KEY=your_vietmap_api_key_here
```

Copy `.env.example` thành `client/.env` khi bắt đầu tích hợp VietMap thật. Không commit API key.

## Giới hạn MVP

This MVP does not scrape Facebook groups. It supports manual Facebook post import and future official Facebook Page API integration.
