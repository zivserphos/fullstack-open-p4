import { palindrome } from "../utils/for_testing";

test("palindrome of a", () => {
  const result = palindrome("a");

  expect(result).toBe("a");
});

test("palindrom of 7177", () => {
  const result = palindrome("7177");
  expect(result).toBe("7717");
});

test("palindrome of react", () => {
  const result = palindrome("react");

  expect(result).toBe("tcaer");
});

test("palindrome of releveler", () => {
  const result = palindrome("releveler");

  expect(result).toBe("releveler");
});
