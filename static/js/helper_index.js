
    const connection = require("./db");
    const md5 = require('md5');
    let db;
    
    async function init() {
        
        db = await connection();

        getScore = async (login) => {
            let scoreAll = [];
            const queryDb = await db.collection("users").findOne({login: login});
            const resultsDb = await db.collection("results");
            const getScore = await resultsDb.find();
            const results = await getScore.toArray();

            if (results.length > 0) { /////////////////////// ??????????????????????
                for (let i = 0; i < results.length; i++) {
                    if (results[i].id == queryDb._id) {
                        scoreAll[i] = results[i].score;
                    }
                }
        
                scoreAll.sort(function (a, b) {
                    return b - a;
                });
        
                return scoreAll[0];
            } else {
                return 0;
            }
        }

        getUserName = async login => {
            const queryDb = await db.collection("users").findOne({login: login});

            return {name: queryDb.name, login: login, id: queryDb._id};
        }

        chekingForms = async (dataForm, ip) => {
            let res = {};

            if (dataForm.page === "login"){
                res = await checkingLogin(dataForm);
            } else if (dataForm.page === "register"){
                res = await checkingRegister(dataForm, ip);
            }

            return res;
        }

        checkingLogin = async (dataForm) => {
            let res = {
                login: false, 
                password: false, 
                id: false, 
                check: false, 
                page: "login"
            };

            const usersDb = await db.collection("users").findOne({"login": dataForm.login});

            if (!usersDb) {
                return res;
            }

            if (usersDb.password === md5(dataForm.password)) {
                res.login = true;
                res.password = true;
                res.id = usersDb._id;
                res.check = true;
            }
            if (usersDb.password != md5(dataForm.password)) {
                res.login = true;
            }

            return res;
        }

        checkingRegister = async (dataForm, ip) => {
            let res = {
                login: {empty: true, rule: false},
                name: false,
                password: {match: false, rule: false},
                reg: false,
                data: dataForm,
                ip: ip,
                page: "register"
            };
            const usersDb = await db.collection("users").findOne({"login": dataForm.login});

            if (usersDb) {
                res.login.empty = false;
            }
            if (dataForm.login && !usersDb) {
                res.login.rule = helperChekRegLogin(dataForm.login);
            }
            if (dataForm.name) {
                res.name = helperChekRegName(dataForm.name);
            }
            if (dataForm.password && dataForm.passConfirm 
                && dataForm.password.length >=8 
                && dataForm.passConfirm.length >= 8) {
                    res.password.rule = true;
            }
            if (dataForm.password === dataForm.passConfirm) {
                res.password.match = true;
            }


            if (res.login.empty === true 
                && res.login.rule === true 
                && res.name === true 
                && res.password.match === true 
                && res.password.rule === true) {
                res.reg = true;
            }

            return res;
        }

        helperChekRegLogin = (login) => {
            let res;

            for (let simbol of login) {
                
                if (simbol.charCodeAt() < 48 || (simbol.charCodeAt() > 57 && simbol.charCodeAt() < 97) || simbol.charCodeAt() > 122) {
                    return res = false;
                }
            }

            return res = true;
        }

        helperChekRegName = (name) => {
            for (let simbol of name) {
                const codeSimbol = simbol.charCodeAt();

                if ((codeSimbol >= 65 && codeSimbol <= 90) || (codeSimbol >= 97 && codeSimbol <= 122) || (codeSimbol >= 1040 && codeSimbol <= 1103) 
                || codeSimbol === 1025 || codeSimbol === 1105 || codeSimbol === 20) {
                    continue;
                } else return false;
            }
            
            return true;
        }

        createUser = async (dataForm) => {
            const data = new Date().getTime();

            await db.collection("users").insert({
                login: dataForm.res.data.login,
                name: dataForm.res.data.name,
                password: md5(dataForm.res.data.password),
                data: new Date(data),
                ip: dataForm.res.ip
            });

            const usersDb = await db.collection("users").findOne({"login": dataForm.res.data.login});

            return `${usersDb._id} ${usersDb.name} ${usersDb.login}`;
        }

        module.exports.getScore = getScore;
        module.exports.getUserName = getUserName;
        module.exports.chekingForms = chekingForms;
        module.exports.createUser = createUser;
    }


    init();

    