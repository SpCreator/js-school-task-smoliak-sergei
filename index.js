const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 9090;

const task1 = require("./tasks/task1.js");
const task2 = require("./tasks/task2.js");
const task3 = require("./tasks/task3.js");
const task4 = require("./tasks/task4.js");
const task5 = require("./tasks/task5.js");

app.use(express.static("static"));
app.use(express.static(__dirname));
app.use(bodyParser.json({type: ["application/json"]}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get("*", (req, res) => {
    res.send("Page not found...")
})

app.post("/task1", (req, res) => {
    let result = task1.conversionNum(req.body.input);

    if (!result || typeof result != "number") {
        res.status(400);
        res.send(JSON.stringify(            
            {
                res: result, 
                status: res.statusCode, 
                message: res.statusMessage
            }
        ));
    } else {
        res.send(JSON.stringify({res: result}));
    }
})

app.post("/task2", (req, res) => {
    let result = task2.polyindromeСheck(req.body.input);

    if (req.body.input === 666) {
        res.status(500); // ERROR 500
        res.send(JSON.stringify(            
            {
                status: res.statusCode, 
                message: res.statusMessage
            }
        ));
    } else {
        if (!result) {
            res.status(400);
            res.send(JSON.stringify(            
                {
                    res: result, 
                    status: res.statusCode, 
                    message: res.statusMessage
                }
            ));
        } else {
            res.send(JSON.stringify({res: result}));
        }
    }
})

app.post("/task3", (req, res) => {
    let result = task3.checkingString(req.body.input);

    if (!result) {
        res.status(400);
        res.send(JSON.stringify(            
            {
                res: result, 
                status: res.statusCode, 
                message: res.statusMessage
            }
        ));
    } else {
        res.send(JSON.stringify({res: result}));
    }
})

app.post("/task4", (req, res) => {
    let result = task4.combine(req.body.input);

    if (!result) {
        res.status(400);
        res.send(JSON.stringify(            
            {
                res: result, 
                status: res.statusCode, 
                message: res.statusMessage
            }
        ));
    } else {
        res.send(JSON.stringify({res: result}));
    }
})

app.post("/task5", (req, res) => {
    let result = task5.checkingArr(req.body.input);

    if (!result) {
        res.status(400);
        res.send(JSON.stringify(            
            {
                res: result, 
                status: res.statusCode, 
                message: res.statusMessage
            }
        ));
    } else {
        res.send(JSON.stringify({res: result}));
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})