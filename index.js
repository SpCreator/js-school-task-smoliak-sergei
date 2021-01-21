(function() {
    const path = require('path');
    const public = path.join(__dirname, 'static');
    const express = require("express");
    const bodyParser = require("body-parser");
    const cookieParser = require("cookie-parser");
    const helper = require("./static/js/helper_index");
    const admin = require("./admin/js/admin");
    const app = express();
    const port = 9090;
    const urlencodedParser = bodyParser.urlencoded({extended: false});
    const connection = require("./static/js/db");

    let db;

    async function init() {
        db = await connection();

        app.use(express.static(__dirname));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(function (err, req, res, next) {
            res.status(400).send(err.message);
        });
        
        app.set("view engine", "pug");

        app.get("/", (req, res) => {
            if (req.cookies.auth) {
                res.sendFile(public + "/views/index.html");
            } else {
                res.redirect("/login");
            };
        });
        app.get("/rules", (req, res) => {
            if (req.cookies.auth) {
                res.sendFile(__dirname + "/static/views/rules.html");
            } else {
                res.redirect("/login");
            };
        });
        app.get("/login", async (req, res) => {
            if (req.cookies.auth) {
                res.redirect("/");
            } else {
                res.sendFile(__dirname + "/static/views/login.html");
            }
        });
        app.get("/register", async (req, res) => {
            if (req.cookies.auth) {
                res.redirect("/");
            } else {
                res.sendFile(__dirname + "/static/views/register.html");
            }
        });
        app.get("/logout", (req, res) => {
            res.clearCookie("auth");
            res.redirect("/login");
        });
        app.get("/admin", async (req, res) => {
            const checkRole = await helper.checkingRoleAdminFront(req.cookies);

            if (checkRole) { // TODO: вынести в отдельную функцию
                let allUsers;

                if (req.query.sort) {
                    allUsers = await admin.getAllUsers({action: 'sort', prop: req.query.sort});
                } else if (req.query.pagin) {
                    allUsers = await admin.getAllUsers({action: 'pagin', prop: req.query.pagin});
                } else if (req.query.search) {

                } else allUsers = await admin.getAllUsers();
                res.render(__dirname + "/admin/views/admin", {users: allUsers});
            } else if (!checkRole) {
                res.redirect("/");
            } else {
                res.redirect("/login");
            }
        });
        app.get("*", (req, res) => {
            res.send("Page not found...")
        });
        
        app.post("/result", async (req, res) => {
            const action = req.body.action;
            const resultsDb = await db.collection("results");

            if (action === "get") { // TODO: вынести в отдельную функцию
                const results = await helper.getLimitResults(resultsDb, 10);
                res.send(JSON.stringify(results));
            } else if (action === "set") {
                resultsDb.insert(req.body.data);
                res.status(200).send();
            } else if (action === "del") {
                const allResults = await helper.getLimitResults(resultsDb);
                if (helper.dropUserReslt(req.cookies, allResults))
                
                res.redirect("/");
            }
        });
        app.post("/checking", urlencodedParser, async (req, res) => {
            const body = req.body;
            const ip = req.connection.remoteAddress;
            const resCheck = await helper.chekingForms(body, ip);

            if (resCheck.page == "register" ) { // TODO: вынести в отдельную функцию
                res.send(JSON.stringify({res: resCheck, page: body.page}));
            }

            if (resCheck.page === "login") {
                if (resCheck.check) {
                    const getName = await helper.getUserName(body.login);
                    const cookieData = `${getName.id} ${getName.name} ${body.login} ${getName.role}`;
                    res.cookie("auth",`${cookieData}`, {}); // TODO: add age or replace on the cookie-session
                }
                res.send(JSON.stringify({res: resCheck, page: body.page}));
            }
        });
        app.post("/create",  urlencodedParser, async (req, res) => {
            const createUserDb = await helper.createUser(req.body);
            res.cookie("auth", createUserDb, {});
            res.send(JSON.stringify({}));
        });
        app.post("/score", async (req, res) => {
            const score = await helper.getScore(req.body.login);
            res.send(JSON.stringify({score: score}));
        });
        app.post("/admin", async (req, res) => {
            const chekRole = await helper.checkingRoleAdminBack(req.body);
            res.send(JSON.stringify({res: chekRole}));
        });

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
        
    }

    init();
})();