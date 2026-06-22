---
name: Shuttle Connect
description: Nền tảng kết nối người chơi cầu lông
colors:
  blue: "#0d5cff"
  blue-dark: "#083bb8"
  green: "#18b365"
  orange: "#ff8a1f"
  purple: "#7c3aed"
  navy: "#07152f"
  text: "#111827"
  muted: "#64748b"
  surface: "#ffffff"
  bg: "#ffffff"
  border: "#e5edf7"
  soft-bg: "#f5f9ff"
  success: "#18b365"
  warning: "#ff8a1f"
  danger: "#ef4444"
typography:
  body:
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  2: "8px"
  4: "16px"
  6: "24px"
  8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
---

# Design System: Shuttle Connect

## 1. Overview

**Creative North Star: "Sân Cầu Lông Số Năng Động"**

Hệ thống thiết kế mang tính thể thao, năng động và thân thiện với sinh viên. Tập trung vào sự rõ ràng, dễ đọc để người dùng nhanh chóng tìm thấy thông tin trận đấu (giờ, trình độ, giá tiền). Thiết kế ưu tiên các không gian thoáng, bóng đổ mượt mà và hoạt ảnh tương tác vi mô (micro-interactions) để tạo cảm giác hiện đại nhưng không rườm rà. Hệ thống tuyệt đối tránh sự nặng nề của các giao diện quản trị cũ và các nút bấm vô hồn.

**Key Characteristics:**
- Năng động, Thể thao (Sporty)
- Hiện đại, Sạch sẽ (Clean & Modern)
- Dễ tiếp cận cho mọi thiết bị di động

## 2. Colors

Bảng màu mang hơi hướng thể thao với màu xanh dương chủ đạo tạo sự tin cậy, điểm xuyết bằng các màu cảnh báo nổi bật để tạo điểm nhấn cho các thông số trận đấu.

### Primary
- **Sport Blue** (#0d5cff): Màu nhận diện chính, dùng cho các hành động quan trọng (Call to Actions, Nút bấm chính, Icon nổi bật).
- **Deep Blue** (#083bb8): Trạng thái hover của màu Primary.

### Secondary
- **Success Green** (#18b365): Dành cho các trạng thái thành công, tỷ lệ ghép trận, các con số tích cực.
- **Warning Orange** (#ff8a1f): Dành cho các đánh giá, điểm số độ tin cậy hoặc cảnh báo cần lưu ý.
- **Accent Purple** (#7c3aed): Nhấn mạnh các số liệu quan trọng hoặc nhãn phụ.

### Neutral
- **Deep Navy** (#07152f): Dùng cho các tiêu đề (Heading) để tạo độ tương phản mạnh và sự sắc nét.
- **Main Text** (#111827): Màu chữ nội dung chính.
- **Muted Text** (#64748b): Dành cho các đoạn text phụ trợ, icon không quan trọng.
- **Surface** (#ffffff): Màu nền của các thẻ (Card), khung nhập liệu.
- **Soft Background** (#f5f9ff): Nền phụ họa, vùng không gian để phân tách giữa các khối màu trắng.
- **Border** (#e5edf7): Đường viền mỏng và nhẹ.

**The Contrast Rule.** Chữ nội dung luôn luôn là màu `--text` (rất tối) hoặc `--muted` (xám xanh đậm) trên nền sáng. Không bao giờ dùng màu xám nhạt khó đọc.

## 3. Typography

**Body Font:** Inter (với hệ thống fallback mặc định của OS).

**Character:** Sạch sẽ, hình học, dễ đọc ngay cả ở kích thước nhỏ (như xem trên điện thoại).

### Hierarchy
- **Headline** (700, 20px - 36px, 1.5): Tiêu đề chính của các section hoặc card lớn.
- **Title** (600, 18px, 1.5): Dành cho tên sân, tên kèo đấu.
- **Body** (500, 14px - 16px, 1.5): Text thông tin, các nhãn hiển thị trong thẻ.
- **Label** (600, 13px - 14px): Text trong các nút bấm, số liệu thống kê nhỏ.

## 4. Elevation

Sử dụng hệ thống bóng đổ (Shadows) kết hợp với các hoạt ảnh nghiêng (tilt) và nổi (lift) khi hover để tạo chiều sâu thay vì dùng đường viền quá đậm.

### Shadow Vocabulary
- **shadow-sm** (`0 1px 3px rgba(0,0,0,0.05)`): Gắn mặc định cho các GameCard, StatCard ở trạng thái nghỉ.
- **shadow-md** (`0 4px 12px rgba(...)`): Nổi bật các khối panel quan trọng hoặc button.
- **shadow-lg** (`0 12px 24px -4px rgba(...)`): Hiệu ứng bóng đổ nổi bật nhất, dùng cho thanh Quick Search hoặc Modal nổi.

**The Floating Rule.** Trạng thái hover của các card (`.hover-tilt`, `.hover-lift`) phải đi kèm việc gia tăng cường độ shadow để người dùng cảm nhận rõ tính tương tác vật lý.

## 5. Components

### Buttons
- **Shape:** Bo tròn toàn bộ (9999px).
- **Primary:** Nền xanh dương (`--blue`), chữ trắng, padding 10px 20px. 
- **Outline:** Nền trong suốt hoặc `--surface`, chữ và viền phụ thuộc vào trạng thái (mặc định viền `--border`, hover viền `--blue`).
- **Hover / Focus:** Thường đi kèm `transform: scale()` nhẹ hoặc `translateY(-2px)`.

### Cards / Containers
- **Corner Style:** Bo góc lớn, từ 12px đến 24px tùy độ lớn của thẻ.
- **Background:** `--surface` (Trắng) hoặc `--soft-bg` (Xanh nhạt).
- **Shadow Strategy:** Sử dụng `shadow-sm` kết hợp viền mỏng `--border`.

### Inputs / Fields
- **Style:** Nền `--surface`, viền `--border`, bo góc 12px.
- **Focus:** Viền đổi thành màu `--blue` và xuất hiện vầng sáng glow (box-shadow outline).

## 6. Do's and Don'ts

### Do:
- **Do** sử dụng các hiệu ứng micro-animations mượt mà (như `.hover-tilt` hoặc vút icon mũi tên) để làm ứng dụng sống động hơn.
- **Do** giữ cho các thông số trận đấu (giờ, chi phí, trình độ) được hiển thị dạng grid ngăn nắp thay vì đoạn text dài.
- **Do** đảm bảo độ tương phản cao cho chữ trong cả Light Mode và Dark Mode.

### Don't:
- **Don't** sử dụng các animation quá rườm rà làm chặn luồng trải nghiệm chính của người chơi.
- **Don't** dùng các viền (border) có màu sắc mạnh làm dải sọc trang trí bên hông thẻ (side-stripe borders).
- **Don't** hiển thị các card có cùng một form nhàm chán lặp lại vô tận mà không có điểm nhấn trực quan nào.
