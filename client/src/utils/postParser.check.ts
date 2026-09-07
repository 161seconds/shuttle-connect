import assert from 'node:assert/strict';
import { parseFacebookPost } from './postParser.ts';

const standard = parseFacebookPost('Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình.');
assert.equal(standard.courtName, 'Sân TADA');
assert.equal(standard.startTime, '19:00');
assert.equal(standard.endTime, '21:00');
assert.equal(standard.slotsNeeded, 2);
assert.equal(standard.price, 80000);
assert.equal(standard.skillLevel, 'Trung bình khá');

const freeEvening = parseFacebookPost('Ngày mai sân Bách Khoa Quận 10 7pm-9pm tuyển 1 bạn khá, free, Zalo 0909123456.');
assert.equal(freeEvening.startTime, '19:00');
assert.equal(freeEvening.endTime, '21:00');
assert.equal(freeEvening.price, 0);
assert.equal(freeEvening.missingFields.length, 0);

const incomplete = parseFacebookPost('Cần người đánh cầu tối nay.');
assert.ok(incomplete.missingFields.includes('Tên sân'));
assert.equal(incomplete.price, undefined);

console.log('Parser checks passed.');
