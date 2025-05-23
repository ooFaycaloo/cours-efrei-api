import { Sum } from "./sum";

describe('alg functions', () => {
  test('1 + 2 to be equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
  });
  test('5 + 7 to be equal 12', () => {
    expect(Sum(5, 7)).toBe(12);
  })
});