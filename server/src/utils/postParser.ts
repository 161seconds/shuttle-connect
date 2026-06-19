import { ParsedFacebookPost } from '../types';

export const parseFacebookPost = (text: string): ParsedFacebookPost => {
  const normalizedText = text.toLowerCase();
  const parsed: Partial<ParsedFacebookPost> = {};
  const missingFields: string[] = [];
  let score = 0;

  // 1. District
  const districtMatch = normalizedText.match(/(quận \d+|q\d+|q\.\d+|bình thạnh|phú nhuận|gò vấp|tân bình|tân phú)/);
  if (districtMatch) {
    parsed.district = districtMatch[1];
    score += 15;
  } else {
    missingFields.push('district');
  }

  // 2. Date keywords
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  if (normalizedText.includes('hôm nay') || normalizedText.includes('tối nay')) {
    parsed.playDate = today;
    score += 10;
  } else if (normalizedText.includes('ngày mai') || normalizedText.includes('mai')) {
    parsed.playDate = tomorrow;
    score += 10;
  } else {
    missingFields.push('playDate');
  }

  // 3. Time range (e.g. 19-21h, 19h-21h)
  const timeMatch = normalizedText.match(/(\d{1,2})(?:h|:00)?\s*(?:-|đến)\s*(\d{1,2})(?:h|:00)?/);
  if (timeMatch) {
    parsed.startTime = `${timeMatch[1].padStart(2, '0')}:00`;
    parsed.endTime = `${timeMatch[2].padStart(2, '0')}:00`;
    score += 15;
  } else {
    missingFields.push('startTime', 'endTime');
  }

  // 4. Slots (e.g. cần 2, thiếu 1)
  const slotMatch = normalizedText.match(/(?:cần|thiếu|tuyển|thêm)\s*(?:thêm)?\s*(\d)/);
  if (slotMatch) {
    parsed.slotsNeeded = parseInt(slotMatch[1], 10);
    score += 15;
  } else {
    missingFields.push('slotsNeeded');
  }

  // 5. Price (e.g. 80k, 100k, 70.000)
  const priceMatch = normalizedText.match(/(\d{2,3})(?:k|\.000)/);
  if (priceMatch) {
    parsed.price = parseInt(priceMatch[1], 10) * (normalizedText.includes('k') ? 1000 : 1);
    score += 15;
  } else {
    missingFields.push('price');
  }

  // 6. Skill level
  if (normalizedText.match(/(tb khá|trung bình khá)/)) {
    parsed.skillLevel = 'TB Khá';
    score += 15;
  } else if (normalizedText.match(/(trung bình|tb)/)) {
    parsed.skillLevel = 'TB';
    score += 15;
  } else if (normalizedText.match(/(khá|cứng)/)) {
    parsed.skillLevel = 'Khá';
    score += 15;
  } else if (normalizedText.match(/(yếu|giao lưu)/)) {
    parsed.skillLevel = 'Giao lưu / Yếu';
    score += 15;
  } else {
    missingFields.push('skillLevel');
  }

  // 7. Contact info
  const phoneMatch = normalizedText.match(/(?:0|\+84)\d{9}/);
  if (phoneMatch) {
    parsed.contactInfo = phoneMatch[0];
    score += 15;
  } else if (normalizedText.match(/(ib|inbox|zalo)/)) {
    parsed.contactInfo = 'Inbox/Zalo Host';
    score += 10;
  } else {
    missingFields.push('contactInfo');
  }

  return {
    ...parsed,
    confidenceScore: Math.min(score, 100),
    missingFields
  };
};
