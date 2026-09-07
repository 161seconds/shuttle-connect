import type { ParsedFacebookPost, SkillLevel } from '../types';

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseClock = (raw: string) => {
  const token = raw.toLowerCase().replace(/\s/g, '');
  const match = token.match(/^(\d{1,2})(?:h|:)?(\d{2})?(am|pm)?$/);
  if (!match) return undefined;
  let hour = Number(match[1]);
  const minute = Number(match[2] ?? 0);
  if (match[3] === 'pm' && hour < 12) hour += 12;
  if (match[3] === 'am' && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return undefined;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

export function parseFacebookPost(text: string): ParsedFacebookPost {
  const normalized = text.toLocaleLowerCase('vi');
  const result: ParsedFacebookPost = { confidenceScore: 0, missingFields: [], originalText: text };
  let score = 0;

  const knownCourts = [
    ['tada', 'Sân TADA'], ['bách khoa', 'Sân Bách Khoa'], ['gia định', 'Sân Gia Định'],
    ['kỳ hòa', 'Sân Kỳ Hòa'], ['ga trực thăng', 'Sân Ga Trực Thăng'],
    ['celadon', 'Celadon Sports'], ['bến vân đồn', 'Sân Bến Vân Đồn'],
    ['hoàng diệu', 'Sân Hoàng Diệu 2'],
  ] as const;
  const knownCourt = knownCourts.find(([keyword]) => normalized.includes(keyword));
  const courtMatch = text.match(/sân\s+(?:cầu lông\s+)?(.+?)(?=\s+(?:q\.?\s?\d+|quận|bình thạnh|tân bình|tân phú|thủ đức|gò vấp|phú nhuận|hôm nay|tối nay|mai|\d{1,2}(?:h|:|pm)|cần|thiếu|tuyển)|[,.;]|$)/i);
  if (knownCourt) result.courtName = knownCourt[1];
  else if (courtMatch?.[1]) result.courtName = `Sân ${courtMatch[1].trim()}`;
  if (result.courtName) score += 15;

  const districts: Array<[RegExp, string]> = [
    [/bình thạnh/i, 'Bình Thạnh'], [/tân bình/i, 'Tân Bình'], [/tân phú/i, 'Tân Phú'],
    [/phú nhuận/i, 'Phú Nhuận'], [/gò vấp/i, 'Gò Vấp'], [/thủ đức/i, 'Thủ Đức'],
  ];
  for (const [pattern, name] of districts) {
    if (!pattern.test(text)) continue;
    result.district = name;
    score += 15;
    break;
  }
  if (!result.district) {
    const numberedDistrict = text.match(/(?:quận\s*|q\.?\s*)(1|3|4|5|6|7|8|10|11|12)\b/i);
    if (numberedDistrict) {
      result.district = `Quận ${numberedDistrict[1]}`;
      score += 15;
    }
  }
  if (result.district) result.address = `${result.courtName ?? 'Sân cầu lông'}, ${result.district}, TP. HCM`;

  const today = new Date();
  if (/hôm nay|tối nay|chiều nay|sáng nay/i.test(text)) {
    result.playDate = formatLocalDate(today);
    score += 15;
  } else if (/ngày mai|tối mai|sáng mai|\bmai\b/i.test(text)) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    result.playDate = formatLocalDate(tomorrow);
    score += 15;
  } else {
    const dateMatch = text.match(/\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/);
    if (dateMatch) {
      const year = dateMatch[3] ? Number(dateMatch[3].length === 2 ? `20${dateMatch[3]}` : dateMatch[3]) : today.getFullYear();
      const date = new Date(year, Number(dateMatch[2]) - 1, Number(dateMatch[1]));
      if (!Number.isNaN(date.getTime())) {
        result.playDate = formatLocalDate(date);
        score += 15;
      }
    }
  }

  const timeMatch = text.match(/(\d{1,2}(?:(?:h|:)\d{0,2})?\s*(?:am|pm)?)\s*(?:-|–|đến|tới)\s*(\d{1,2}(?:(?:h|:)\d{0,2})?\s*(?:am|pm)?)/i);
  if (timeMatch) {
    result.startTime = parseClock(timeMatch[1]);
    result.endTime = parseClock(timeMatch[2]);
    if (result.startTime && result.endTime) score += 20;
  }

  const slotsMatch = normalized.match(/(?:cần|thiếu|tuyển|tìm)\s+(?:thêm\s+)?(\d+)\s*(?:vãng lai|slot|bạn|người)?/) ?? normalized.match(/(\d+)\s*(?:vãng lai|slot)/);
  if (slotsMatch) {
    result.slotsNeeded = Number(slotsMatch[1]);
    score += 10;
  }

  const priceK = normalized.match(/\b(\d{1,3})\s*k\b/);
  const priceFull = normalized.match(/\b(\d{1,3}(?:\.\d{3})+)\s*(?:đ|vnd|đồng)?/);
  if (/miễn phí|\bfree\b/i.test(text)) result.price = 0;
  else if (priceK) result.price = Number(priceK[1]) * 1000;
  else if (priceFull) result.price = Number(priceFull[1].replaceAll('.', ''));
  if (result.price !== undefined) score += 10;

  const skillPatterns: Array<[RegExp, SkillLevel]> = [
    [/tb\s*khá|trung bình khá/i, 'Trung bình khá'], [/trung bình|\btb\b/i, 'Trung bình'],
    [/cứng/i, 'Cứng'], [/khá/i, 'Khá'], [/yếu|mới chơi/i, 'Yếu'],
    [/giao lưu|mọi trình/i, 'Giao lưu'],
  ];
  const skill = skillPatterns.find(([pattern]) => pattern.test(text));
  if (skill) {
    result.skillLevel = skill[1];
    score += 10;
  }

  const phone = text.match(/(?:\+84|0)(?:3|5|7|8|9)(?:\d[ .]?){8}/);
  if (phone) result.contactInfo = phone[0].replace(/[ .]/g, '');
  else if (/\bib\b|inbox|zalo/i.test(text)) result.contactInfo = 'Inbox / Zalo';
  if (result.contactInfo) score += 5;

  const required: Array<[keyof ParsedFacebookPost, string]> = [
    ['courtName', 'Tên sân'], ['district', 'Quận/Huyện'], ['playDate', 'Ngày chơi'],
    ['startTime', 'Giờ bắt đầu'], ['endTime', 'Giờ kết thúc'], ['slotsNeeded', 'Số slot'],
    ['price', 'Chi phí'], ['skillLevel', 'Trình độ'], ['contactInfo', 'Liên hệ'],
  ];
  result.missingFields = required.filter(([key]) => result[key] === undefined).map(([, label]) => label);
  result.confidenceScore = Math.min(score, 100);
  return result;
}
