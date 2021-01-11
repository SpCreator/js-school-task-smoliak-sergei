const got = require("got");

describe("Positive:", () => {
    test("value is number integer", async () => {
        const {body} = await got.post("http://localhost:9090/task3", { 
            json: {
                input: "()()(){}{}{}{}[][][][]"
            },
            responseType: "json"
        });
        expect(body.res).toBe(true);
    });
});

describe("Negative:", () => {
    test("value is not string", async () => {
        try {
            await got.post("http://localhost:9090/task3", { 
                json: {
                    input: 123454321123454321
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("empty value", async () => {
        try {
            await got.post("http://localhost:9090/task3", { 
                json: {
                    input: ""
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("unsuitable simbol", async () => {
        try {
            await got.post("http://localhost:9090/task3", { 
                json: {
                    input: "()()(){}{}{}{}[][][]<[]>"
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value more than MAX_INPUT_VALUE", async () => {
        try {
            await got.post("http://localhost:9090/task3", { 
                json: {
                    input: "()()(){}{}{}{}[][][]()()(){}{}{}{}[][][]()()(){}{}{}{}[][][]()()(){}{}{}{}[][][]()()(){}{}{}{}{}{}[][][]()"
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });
});