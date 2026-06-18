import type { ParsedFacebookPost } from '../types';

export function parseFacebookPost(text: string): ParsedFacebookPost {
  const parsed: Partial<ParsedFacebookPost> = {};
  let confidenceScore = 0;
  const missingFields: string[] = [];
  const textLower = text.toLowerCase();

  // 1. Extract Date
  if (textLower.includes('today') || textLower.includes('hôm nay')) {
    parsed.date = new Date().toISOString().split('T')[0];
    confidenceScore += 15;
  } else if (textLower.includes('tomorrow') || textLower.includes('ngày mai')) {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    parsed.date = tmr.toISOString().split('T')[0];
    confidenceScore += 15;
  }

  // 2. Extract Time
  const timeMatch = text.match(/(\d{1,2}(?::\d{2})?\s*[hp]m?)\s*[-tđến]+\s*(\d{1,2}(?::\d{2})?\s*[hp]m?)/i) || 
                    text.match(/(\d{1,2})\s*-\s*(\d{1,2})\s*h/i);
  if (timeMatch) {
    parsed.timeRange = `${timeMatch[1]} - ${timeMatch[2]}`;
    confidenceScore += 20;
  }

  // 3. Extract Slots
  const slotsMatch = textLower.match(/(?:cần|thiếu|tuyển)\s+(\d+)/);
  if (slotsMatch) {
    parsed.slotsNeeded = parseInt(slotsMatch[1], 10);
    confidenceScore += 20;
  }

  // 4. Extract Price
  const priceMatch = textLower.match(/(\d+)\s*(?:k|nghìn|ngan)(?:\/| trên )?(?:người|slot)?/);
  if (priceMatch) {
    parsed.price = parseInt(priceMatch[1], 10) * 1000;
    confidenceScore += 15;
  }

  // 5. Extract Skill Level
  const skills = ['yếu', 'trung bình', 'tb khá', 'khá', 'cứng'];
  for (const skill of skills) {
    if (textLower.includes(skill)) {
      parsed.skillLevel = skill;
      confidenceScore += 15;
      break;
    }
  }

  // 6. Contact Info (Phone number simplistic match)
  const phoneMatch = text.match(/(?:0|\+84)\d{9}/);
  if (phoneMatch) {
    parsed.contactInfo = phoneMatch[0];
    confidenceScore += 15;
  }

  // Check Missing Fields
  if (!parsed.date) missingFields.push('Date');
  if (!parsed.timeRange) missingFields.push('Time Range');
  if (!parsed.slotsNeeded) missingFields.push('Slots Needed');
  if (!parsed.price) missingFields.push('Price');
  if (!parsed.skillLevel) missingFields.push('Skill Level');
  if (!parsed.contactInfo) missingFields.push('Contact Info');

  return {
    date: parsed.date,
    timeRange: parsed.timeRange,
    slotsNeeded: parsed.slotsNeeded,
    price: parsed.price,
    skillLevel: parsed.skillLevel,
    courtName: parsed.courtName,
    contactInfo: parsed.contactInfo,
    confidenceScore: Math.min(confidenceScore, 100),
    missingFields,
  };
}
