import type { ParsedFacebookPost } from '../types';

export function parseFacebookPost(text: string): ParsedFacebookPost {
  const parsed: Partial<ParsedFacebookPost> = {};
  let confidenceScore = 0;
  const missingFields: string[] = [];
  const textLower = text.toLowerCase();

  // 1. Extract Court Name
  const courtPatterns = [
    /sân\s+(?:cầu lông\s+)?([A-Z0-9a-zÀ-ỹ\s]+?)(?=\s+(?:quận|q\d|q\.|bình thạnh|tân bình|thủ đức|gò vấp|phú nhuận|tân phú|hôm nay|ngày mai|tối nay|mai|\d{1,2}[h:]|\d{1,2}\/|\btrình\b|\bcần\b|\bthiếu\b|\btuyển\b|$))/i,
    /(?:tại|ở)\s+sân\s+([A-Z0-9a-zÀ-ỹ\s]+?)(?=\s+(?:quận|bình thạnh|tân bình|hôm nay|tối nay|\d{1,2}[h:]|$))/i,
  ];

  for (const pattern of courtPatterns) {
    const match = text.match(pattern);
    if (match && match[1]?.trim()) {
      const courtCandidate = match[1].trim();
      // Clean up common suffix or trailing words
      if (courtCandidate.length >= 3 && courtCandidate.length <= 40) {
        parsed.courtName = `Sân ${courtCandidate.replace(/^sân\s+/i, '')}`;
        confidenceScore += 15;
        break;
      }
    }
  }

  // Fallback court lookup by well-known keywords
  if (!parsed.courtName) {
    const knownCourts = [
      { key: 'tada', name: 'Sân TADA' },
      { key: 'bách khoa', name: 'Sân Bách Khoa' },
      { key: 'kdc tân quy', name: 'Sân KDC Tân Quy' },
      { key: 'tân quy', name: 'Sân KDC Tân Quy' },
      { key: 'viettel', name: 'Sân Viettel Hoàng Hoa Thám' },
      { key: 'kỳ hòa', name: 'Sân Kỳ Hòa' },
      { key: 'lan anh', name: 'Sân CLB Lan Anh' },
      { key: 'hoàng diệu', name: 'Sân Hoàng Diệu' },
      { key: 'phú thọ', name: 'Sân NTĐ Phú Thọ' },
      { key: 'ga trực thăng', name: 'Sân Ga Trực Thăng' },
      { key: 'trực thăng', name: 'Sân Ga Trực Thăng' },
      { key: 'celadon', name: 'Sân Celadon Sport' },
      { key: 'gia định', name: 'Sân Cầu Lông Gia Định' },
      { key: 'an dương', name: 'Sân 71 An Dương' },
    ];

    for (const c of knownCourts) {
      if (textLower.includes(c.key)) {
        parsed.courtName = c.name;
        confidenceScore += 15;
        break;
      }
    }
  }

  // 2. Extract District / Address
  const districtMap: { [key: string]: string } = {
    'quận 1': 'Quận 1', 'q1': 'Quận 1', 'q.1': 'Quận 1',
    'quận 2': 'Quận 2', 'q2': 'Quận 2', 'q.2': 'Quận 2',
    'quận 3': 'Quận 3', 'q3': 'Quận 3', 'q.3': 'Quận 3',
    'quận 4': 'Quận 4', 'q4': 'Quận 4', 'q.4': 'Quận 4',
    'quận 5': 'Quận 5', 'q5': 'Quận 5', 'q.5': 'Quận 5',
    'quận 6': 'Quận 6', 'q6': 'Quận 6', 'q.6': 'Quận 6',
    'quận 7': 'Quận 7', 'q7': 'Quận 7', 'q.7': 'Quận 7',
    'quận 8': 'Quận 8', 'q8': 'Quận 8', 'q.8': 'Quận 8',
    'quận 10': 'Quận 10', 'q10': 'Quận 10', 'q.10': 'Quận 10',
    'quận 11': 'Quận 11', 'q11': 'Quận 11', 'q.11': 'Quận 11',
    'quận 12': 'Quận 12', 'q12': 'Quận 12', 'q.12': 'Quận 12',
    'bình thạnh': 'Bình Thạnh', 'tân bình': 'Tân Bình',
    'gò vấp': 'Gò Vấp', 'thủ đức': 'Thủ Đức',
    'phú nhuận': 'Phú Nhuận', 'tân phú': 'Tân Phú', 'bình tân': 'Bình Tân'
  };

  for (const [key, val] of Object.entries(districtMap)) {
    // Word boundary check
    const regex = new RegExp(`(?:^|\\s|,|\\()${key}(?:$|\\s|,|\\))`, 'i');
    if (regex.test(textLower)) {
      parsed.district = val;
      parsed.address = `${parsed.courtName || 'Sân cầu lông'}, ${val}, TP. HCM`;
      confidenceScore += 15;
      break;
    }
  }

  // 3. Extract Date
  const now = new Date();
  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  if (textLower.includes('today') || textLower.includes('hôm nay') || textLower.includes('tối nay') || textLower.includes('chiều nay') || textLower.includes('sáng nay')) {
    parsed.date = formatYMD(now);
    confidenceScore += 15;
  } else if (textLower.includes('tomorrow') || textLower.includes('ngày mai') || textLower.includes('mai') || textLower.includes('tối mai') || textLower.includes('sáng mai')) {
    const tmr = new Date(now);
    tmr.setDate(tmr.getDate() + 1);
    parsed.date = formatYMD(tmr);
    confidenceScore += 15;
  } else {
    // Check specific day of week like "thứ 7", "chủ nhật", "t7", "cn"
    const dayKeywords: { [key: string]: number } = {
      'chủ nhật': 0, 'cn': 0, 'thứ 2': 1, 't2': 1, 'thứ 3': 2, 't3': 2,
      'thứ 4': 3, 't4': 3, 'thứ 5': 4, 't5': 4, 'thứ 6': 5, 't6': 5, 'thứ 7': 6, 't7': 6
    };
    for (const [kw, dayNum] of Object.entries(dayKeywords)) {
      if (textLower.includes(kw)) {
        const targetDate = new Date(now);
        const currentDay = now.getDay();
        const diff = (dayNum + 7 - currentDay) % 7 || 7;
        targetDate.setDate(now.getDate() + diff);
        parsed.date = formatYMD(targetDate);
        confidenceScore += 15;
        break;
      }
    }
  }

  // Fallback to today if still empty
  if (!parsed.date) {
    parsed.date = formatYMD(now);
  }

  // 4. Extract Time Range
  // Patterns: "19-21h", "19h-21h", "19h30 - 21h30", "19:00 - 21:00", "7pm-9pm", "18h đến 20h"
  const timeRegex = /(?:lúc\s+)?(\d{1,2})(?:[h:p](\d{2})?|pm)?\s*(?:-|–|đến|tới)\s*(\d{1,2})(?:[h:p](\d{2})?|pm)?/i;
  const timeMatch = text.match(timeRegex);

  if (timeMatch) {
    let startH = parseInt(timeMatch[1], 10);
    const startM = timeMatch[2] || '00';
    let endH = parseInt(timeMatch[3], 10);
    const endM = timeMatch[4] || '00';

    // Handle pm format e.g. 7pm -> 19:00
    if (timeMatch[0].toLowerCase().includes('pm')) {
      if (startH < 12) startH += 12;
      if (endH < 12) endH += 12;
    }

    const startFormatted = `${String(startH).padStart(2, '0')}:${startM}`;
    const endFormatted = `${String(endH).padStart(2, '0')}:${endM}`;
    parsed.startTime = startFormatted;
    parsed.endTime = endFormatted;
    parsed.timeRange = `${startFormatted} - ${endFormatted}`;
    confidenceScore += 20;
  } else {
    // Alternate 24h pattern "19:00 - 21:00"
    const standardTimeMatch = text.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
    if (standardTimeMatch) {
      parsed.startTime = standardTimeMatch[1];
      parsed.endTime = standardTimeMatch[2];
      parsed.timeRange = `${standardTimeMatch[1]} - ${standardTimeMatch[2]}`;
      confidenceScore += 20;
    }
  }

  // 5. Extract Slots Needed
  const slotsMatch = textLower.match(/(?:cần|thiếu|tuyển|cần thêm|tìm)\s+(?:thêm\s+)?(\d+)\s*(?:vãng lai|slot|bạn|người|ng|nam|nữ)?/) ||
                     textLower.match(/(\d+)\s*(?:vãng lai|slot)/);
  if (slotsMatch) {
    parsed.slotsNeeded = parseInt(slotsMatch[1], 10);
    confidenceScore += 15;
  } else {
    parsed.slotsNeeded = 2; // Common default
  }

  // 6. Extract Price
  // "80k", "80k/người", "80.000", "80.000đ", "100k/slot"
  const priceMatchK = textLower.match(/(\d+)\s*k(?:[\/\s]*(?:người|slot|ng|bạn))?/);
  const priceMatchFull = textLower.match(/(\d{1,3}(?:\.\d{3})+)\s*(?:đ|vnd|đồng)?/);
  
  if (priceMatchK) {
    parsed.price = parseInt(priceMatchK[1], 10) * 1000;
    confidenceScore += 15;
  } else if (priceMatchFull) {
    parsed.price = parseInt(priceMatchFull[1].replace(/\./g, ''), 10);
    confidenceScore += 15;
  } else if (textLower.includes('free') || textLower.includes('miễn phí')) {
    parsed.price = 0;
    confidenceScore += 15;
  } else {
    parsed.price = 80000; // Common default
  }

  // 7. Extract Skill Level
  if (textLower.includes('tb khá') || textLower.includes('trung bình khá')) {
    parsed.skillLevel = 'Trung bình khá';
    confidenceScore += 10;
  } else if (textLower.includes('tb yếu') || textLower.includes('trung bình yếu')) {
    parsed.skillLevel = 'Trung bình';
    confidenceScore += 10;
  } else if (textLower.includes('trung bình') || textLower.includes('tb')) {
    parsed.skillLevel = 'Trung bình';
    confidenceScore += 10;
  } else if (textLower.includes('cứng') || textLower.includes('chuyên')) {
    parsed.skillLevel = 'Cứng';
    confidenceScore += 10;
  } else if (textLower.includes('khá')) {
    parsed.skillLevel = 'Khá';
    confidenceScore += 10;
  } else if (textLower.includes('yếu') || textLower.includes('mới chơi')) {
    parsed.skillLevel = 'Yếu';
    confidenceScore += 10;
  } else if (textLower.includes('giao lưu') || textLower.includes('vui vẻ') || textLower.includes('mọi trình độ')) {
    parsed.skillLevel = 'Trung bình';
    confidenceScore += 10;
  } else {
    parsed.skillLevel = 'Trung bình';
  }

  // 8. Extract Contact Info
  // Phone number (VN mobile patterns: 09xx, 08xx, 07xx, 03xx, 05xx) with optional dots or spaces
  const phoneMatch = text.match(/(?:0|\+84)(?:[3|5|7|8|9])(?:\d[\s\.]?){8}/);
  if (phoneMatch) {
    parsed.contactInfo = phoneMatch[0].replace(/[\s\.]/g, '');
    confidenceScore += 10;
  } else if (textLower.includes('ib') || textLower.includes('inbox') || textLower.includes('nhắn tin') || textLower.includes('zalo')) {
    parsed.contactInfo = 'Inbox Facebook / Zalo';
    confidenceScore += 5;
  } else {
    parsed.contactInfo = 'Liên hệ qua bài đăng';
  }

  // 9. Identify Missing Fields
  if (!parsed.courtName) missingFields.push('Tên sân');
  if (!parsed.district) missingFields.push('Quận/Huyện');
  if (!parsed.timeRange) missingFields.push('Khung giờ');
  if (!priceMatchK && !priceMatchFull && !textLower.includes('free')) missingFields.push('Chi phí');
  if (!slotsMatch) missingFields.push('Số lượng slot');
  if (!phoneMatch && !textLower.includes('ib') && !textLower.includes('zalo')) missingFields.push('Thông tin liên hệ');

  // Final score clamping
  const finalScore = Math.min(Math.max(confidenceScore, 30), 100);

  return {
    courtName: parsed.courtName || 'Sân cầu lông (Chưa rõ)',
    address: parsed.address || (parsed.district ? `Khu vực ${parsed.district}, TP. HCM` : 'TP. Hồ Chí Minh'),
    district: parsed.district || 'TP. HCM',
    date: parsed.date,
    startTime: parsed.startTime || '19:00',
    endTime: parsed.endTime || '21:00',
    timeRange: parsed.timeRange || '19:00 - 21:00',
    slotsNeeded: parsed.slotsNeeded || 2,
    price: parsed.price || 80000,
    skillLevel: parsed.skillLevel || 'Trung bình',
    contactInfo: parsed.contactInfo || '0909 123 456',
    confidenceScore: finalScore,
    missingFields,
    originalText: text
  };
}

