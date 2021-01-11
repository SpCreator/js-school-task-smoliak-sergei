const got = require("got");

describe("Positive:", () => {
    const {expect} = require("chai");
    const data = {
        arr1: [2, 3, 1, 3, 2, 4, 100, 6, 20, 7, 9, 2, 19],
        arr2: [2, 1, 4, 3, 9, 100]
    };

    test("checking the expected result", async () => {
        const {body} = await got.post("http://localhost:9090/task4", { 
            json: {
                input: data
            },
            responseType: "json"
        });
        expect(body.res).to.eql([2, 2, 2, 1, 4, 3, 3, 9, 100, 6, 7, 19, 20]);
    });
});

describe("Negative:", () => {
    test("Array #1 does not contain integer '100' from Array #2", async () => {
        try {
            await got.post("http://localhost:9090/task4", { 
                json: {
                    input: {
                        arr1: [2, 3, 1, 3, 2, 4, 6, 20, 7, 9, 2, 19],
                        arr2: [2, 1, 4, 3, 9, 100]
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("empty array", async () => {
        try {
            await got.post("http://localhost:9090/task4", { 
                json: {
                    input: {
                        arr1: [],
                        arr2: [2, 1, 1, 4, 3, 9, 100]
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("the value is repeated in array #2", async () => {
        try {
            await got.post("http://localhost:9090/task4", { 
                json: {
                    input: {
                        arr1: [2, 3, 1, 3, 2, 4, 100, 6, 20, 7, 9, 2, 19],
                        arr2: [2, 1, 4, 4, 3, 9, 100]
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value less than MIN_INT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task4", { 
                json: {
                    input: {
                        arr1: [2, 3, 1, 3, 2, 4, 6, 20, 7, -9, 2, 19],
                        arr2: [2, 1, 4, 3, 9, 100]
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value more than MAX_INT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task4", { 
                json: {
                    input: {
                        arr1: [2, 3, 1, 3, 2, 4, 6, 20, 7, 9, 2, 100, 1900],
                        arr2: [2, 1, 4, 3, 9, 100]
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("no difference between arrays", async () => {
        try {
            await got.post("http://localhost:9090/task4", { 
                json: {
                    input: {
                        arr1: [2, 1, 4, 3, 9, 100],
                        arr2: [2, 1, 4, 3, 9, 100]
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });
});