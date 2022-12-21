import { sum } from './Header';
import { describe, expect, it } from 'vitest';

describe('#sum', () => {
  it('returns 0 with no numbers', () => {
    expect(sum()).toBe(0);
  });
});
