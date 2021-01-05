const {conversionNum, prepareResult} = require("./../task1");

describe("Сonversion`s functions", () => {
    test("prepareResult", () => {
        expect(prepareResult("IV")).toBe(4);
    });
    test("conversionNum", () => {
        expect(conversionNum("XV")).toBe(15);
    });
});