const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 9090;
const urlencodedParser = bodyParser.urlencoded({extended: false});
const cookieParser = require("cookie-parser");

app.use(express.static("static"));
app.use(express.static(__dirname));
app.use(bodyParser.json({ type: ["application/json"] }));
app.use(cookieParser());
app.use(function (err, req, res, next) {
    res.status(400).send(err.message);
});

app.get("/", (req, res) => {
    userAuthCheck(req);
    res.sendFile(__dirname + "/static/index.html");
});
app.get("/rules", (req, res) => {
    userAuthCheck(req);
    res.sendFile(__dirname + "/static/rules.html");
});
app.get("/login", (req, res) => {
    if (req.cookies.name) {
        res.redirect("/");
    }
    res.sendFile(__dirname + "/static/login.html");
});
app.get("/logout", (req, res) => {
    res.clearCookie("name");
    res.redirect("/login");
});
app.get("*", (req, res) => {
    res.send("Page not found...")
});

app.post("/result", (req, res) => {
    res.status = 200;

    if (req.body.action === "get") {
        fs.readFile("db_result.txt", "utf8", (err, data) => {
            if (err) throw err;
            if (data) {
              res.send(data);
            } else {
              res.send(JSON.stringify(data));
            }
        });
    } else if (req.body.action === "set") {
        let data = setResults(req.body, fs);
        res.send(data);
    } else if (req.body.action === "del") {
        fs.writeFileSync("db_result.txt", "");
        res.send("ok");
    }
});
app.post("/login", urlencodedParser, (req, res) => {
    getRegUsers(req.body);
});
app.post("/checking", (req, res) => {
    fs.readFile("db_users.txt", "utf8", (err, data) => {
        if (err) throw err;

        const users = JSON.parse(data);
        let date = new Date();

        res.cookie("name", req.body.login, {
        });
        res.send(getRegUsers(req.body, users));
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

setResults = (dataUsers, fs) => {
    let usersData = "";
    
    if (dataUsers) {
      usersData = dataUsers.allUsers.sort(function (obj1, obj2) {
        if (obj1.name > obj2.name) {

        return -1;
        }
      });
    } else {
        usersData = dataUsers;
    }
  
    data = JSON.stringify({allUsers: usersData});
    fs.writeFileSync("db_result.txt", data);

    return data;
}

getRegUsers = (dataForm, users) => {
    let login = "";
    let res = {};
    console.log(dataForm);
    for (let elem of users) {
        if (elem.login === dataForm.login) {
            login = elem.login;
        } else {
            res = {login: false};
            continue;
        }

        if (login && elem.password === dataForm.password) {
            res = {login: true, password: true};
            break;
        } else {
            res = {login: true, password: false};
            break
        }
    };

    return res;
}

userAuthCheck = (req) => {
    if (!req.cookies.name) {
        res.redirect("/login");
    }
}