const got = require("got");

describe("Positive:", () => {
    test("value is number integer", async () => {
        const {body} = await got.post("http://localhost:9090/task2", { 
            json: {
                input: 121
            },
            responseType: "json"
        });

        expect(body.res).toBe(true);
    });
});

describe("Negative:", () => {
    test("value less than MIN_INPUT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task2", { 
                json: {
                    input: 123454321123454321
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value more than MAX_INPUT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task2", { 
                json: {
                    input: -123454321
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value is string", async () => {
        try {
            await got.post("http://localhost:9090/task2", { 
                json: {
                    input: "123454321"
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("error 500", async () => {
        try {
            await got.post("http://localhost:9090/task2", { 
                json: {
                    input: 666
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(500);
        }
    });

});