import { getMonthName } from "../src/client/js/countdown";

test("Testing the getMonthName function", () => {
  expect(getMonthName(12)).toBe("Dec");
});
