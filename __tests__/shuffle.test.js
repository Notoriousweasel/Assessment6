const { notify } = require("browser-sync");
const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8];
  const shuffledArr = shuffle(testArr);
  test('return an array', () => {
    expect(Array.isArray(shuffledArr)).toBe(true);
  })

  test('return an array', () => {
    expect(shuffledArr).toEqual(expect.arrayContaining(testArr));
    expect(shuffledArr).toHaveLength(testArr.length);
  })

  test('return an array', () => {
    expect(shuffledArr).not.toEqual(testArr);
  })


});
