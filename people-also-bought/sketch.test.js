const sum = require('./sketch.js');

test('adds 1+ 2 + 42 to equal 45', () => {
  expect(sum(1, 2)).toBe(45);
});
