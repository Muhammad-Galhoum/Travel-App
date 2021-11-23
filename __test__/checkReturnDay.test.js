import { checkReturnDay } from "../src/client/js/checkReturnDay";

test("Testing the checkReturnDay function ", () => {
  expect(checkReturnDay("2021-11-1", "2021-12-22")).toBe(51);
});
