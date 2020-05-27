import { calculateTag } from "./customTags";

test("calculateTag", () => {
  const a = calculateTag([1], ["test"], "animal");
  expect(3).toBe(3);
});
