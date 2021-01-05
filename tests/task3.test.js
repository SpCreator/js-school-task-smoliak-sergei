const {checkString, checkHelper} = require("./../task3");

describe("Functions to check string:", () => {
    test("checkString", () => {
        expect(checkString("{}{}{}")).toBe(true);
    });
    
    test("checkHelper", () => {
        expect(checkHelper(["{", "}", "[", "]", "(", ")"])).toBe(true);
    })
});