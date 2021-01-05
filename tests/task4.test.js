const {combine} = require("./../task4");

test("test5", () => {
    expect(combine([2, 1, 4, 3, 9, 100])).toBe([2, 2, 2, 1, 4, 3, 3, 9, 100, 6, 7, 19, 20]);
});