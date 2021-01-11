const got = require("got");

describe("Positive:", () => {
    test("expected result", async () => {
        const {body} = await got.post("http://localhost:9090/task5", { 
            json: {
                input: {
                    arr: [1, 3, 5, 6, 8, 10, 11, 13, 14],
                    req: 5
                }
            },
            responseType: "json"
        });

        expect(body.res).toBe(2);
    });
});

describe("Negative:", () => {
    test("passing an invalid value", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [1, 3, 5, 6, 8, 10, 11, 13, 14],
                        req: "5"
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value less than MIX_INPUT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [1, 3, 5, 6, 8, 10, 11, 13, 14],
                        req: -7
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value more than MAX_INPUT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [1, 3, 5, 6, 8, 10, 11, 13, 14],
                        req: 1000
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("empty value (array)", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [],
                        req: 1000
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("empty value (request)", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [1, 3, 5, 6, 8, 10, 11, 13, 14],
                        req: ""
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value more than MAN_ARR_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [1, 3, 5, 6, 8, 1001, 11, 13, 14],
                        req: 5
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value less than MIN_ARR_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task5", { 
                json: {
                    input: {
                        arr: [1, 3, 5, 6, -8, 10, 11, 13, 14],
                        req: 5
                    }
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });
});