const sum = require("./sum");

test("it should add numbers", () => {
  expect(sum(2, 5)).toBe(7);
});
