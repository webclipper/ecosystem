/* eslint-disable no-undefined */
import notEmptyIndex from './notEmptyIndex';

describe('test notEmptyIndex', () => {
  it('', () => {
    expect(notEmptyIndex([], 0)).toBe(0);
    expect(notEmptyIndex([], 1)).toBe(1);
    expect(notEmptyIndex([''], 0)).toBe(1);
    expect(notEmptyIndex(['', undefined, '', undefined, undefined], 2)).toBe(4);
    expect(notEmptyIndex(['', undefined, '', undefined, undefined, undefined], 3)).toBe(5);
    expect(notEmptyIndex([undefined, '', undefined, '', undefined], 1)).toBe(2);
    expect(notEmptyIndex([undefined, '', undefined, '', undefined, undefined], 3)).toBe(5);
  });
});
