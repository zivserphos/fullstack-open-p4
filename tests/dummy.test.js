const dummy = require("../utils/list_helper").dummy;

describe("dummy", () => {
  test("dummy return 1", () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
  describe("total likes");
});
