const got = require("got");

describe("Positive:", () => {
    test("MIN_INPUT_VALUE", async () => {
        const {body} = await got.post("http://localhost:9090/task1", { 
            json: {
                input: "I"
            },
            responseType: "json"
        }); 
        expect(body.res).toBe(1);
    });

    test("MAX_INPUT_VALUE", async () => {
        const value = "MMMCMXCIX";
        const {body} = await got.post("http://localhost:9090/task1", { 
            json: {
                input: "MMMCMXCIX"
            },
            responseType: "json"
        }); 
        expect(body.res).toBe(3999);
    });
});

describe("Negative:", () => {
    test("value empty", async () => {
        try {
            await got.post("http://localhost:9090/task1", { 
                json: {
                    input: ""
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("non existant letter", async () => {
        try {
            await got.post("http://localhost:9090/task1", { 
                json: {
                    input: "MMMCMXCqIX"
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("value is number integer", async () => {
        try {
            await got.post("http://localhost:9090/task1", { 
                json: {
                    input: 3999
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });

    test("line length exceeded", async () => {
        try {
            await got.post("http://localhost:9090/task1", { 
                json: {
                    input: "IXXXXXVVVVVIIIIIIIIIIIIIIIIIII"
                },
                responseType: "json"
            });
        } catch (e) {
            expect(e.response.body.status).toBe(400);
        }
    });
});