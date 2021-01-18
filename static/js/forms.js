(function() {
    const login = document.querySelector("#login");
    const password = document.querySelector("#password");

    init = () => {
        const loginForm = document.querySelector("#login-from");
        const regForm = document.querySelector("#register-from");;

        if (loginForm) loginForm.addEventListener('submit', checking);
        if (regForm) regForm.addEventListener('submit', checking);
    }

    checking = async (e) => {
        e.preventDefault();
        const target = e.target.id;
        let formData = {};

        if (target === "login-from") formData = loginJSON();
        if (target === "register-from") formData = registerJSON();

        const checkingForm = await helperChecking(formData);

        if (checkingForm.res.check) document.location.href = 'http://localhost:9090'; // костыль
        if (checkingForm.res.reg) {
            newUsers(checkingForm);
            return;
        } 

        checkingState(checkingForm);
    }

    loginJSON = () => {
        return formData = {
            login: login.value,
            password: password.value,
            page: "login"
        };
    }

    registerJSON = () => {
        const name = document.querySelector("#name");
        const passwordConfirm = document.querySelector("#password-confirm");

        return formData = {
            login: login.value,
            name: name.value,
            password: password.value,
            passConfirm: passwordConfirm.value,
            page: "register"
        };
    }

    helperChecking = async (dataForm) => {
        let checking = await fetch('http://localhost:9090/checking', {
            method: 'POST',
            body: JSON.stringify(dataForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return resChecking = await checking.json();
    }

    checkingState = resCheck => {
        const data = resCheck;

        if (data.page === "login") {
            const checkingLogin = document.querySelector(".checking-login");
            const checkingPassword = document.querySelector(".checking-password");
    
            if (checkingLogin.style.display === "block") checkingLogin.style.display = "none";
            if (checkingPassword.style.display === "block") checkingPassword.style.display = "none";
            if (data.res.login === false) {
                checkingLogin.style.display = "block";
                return;
            }
            if (data.res.password === false) checkingPassword.style.display = "block";
        }

        if (data.page === "register") {
            const checkingLoginNot = document.querySelector(".checking-login-not");
            const checkingLoginRule = document.querySelector(".checking-login-rule");
            const checkingName = document.querySelector(".checking-name");
            const checkingPassConfirm = document.querySelector(".checking-password-confirm");
            const checkingPassMatch = document.querySelector(".checking-password-match");

            if (checkingLoginNot.style.display === "block") checkingLoginNot.style.display = "none";
            if (checkingLoginRule.style.display === "block") checkingLoginRule.style.display = "none";
            if (checkingName.style.display === "block") checkingName.style.display = "none";
            if (checkingPassConfirm.style.display === "block") checkingPassConfirm.style.display = "none";
            if (checkingPassMatch.style.display === "block") checkingPassMatch.style.display = "none";

            if (data.res.login.empty === false) {
                checkingLoginNot.style.display = "block";
                clearPasswordValue();
                return;
            }
            if (data.res.login.rule === false) {
                checkingLoginRule.style.display = "block";
                clearPasswordValue();
            }
            if (data.res.name === false) {
                checkingName.style.display = "block";
                clearPasswordValue();
            }
            if (data.res.password.rule === false) {
                checkingPassConfirm.style.display = "block";
                clearPasswordValue();
            }
            if (data.res.password.match === false) {
                checkingPassMatch.style.display = "block";
                clearPasswordValue();
            }
        }
    }

    clearPasswordValue = () => {
        const passwordValue = document.querySelector("#password");
        const passwordConfirmValue = document.querySelector("#password-confirm");
        passwordValue.value = "";
        passwordConfirmValue.value = "";
    }

    newUsers = async (dataForm) => {
        await fetch('http://localhost:9090/create', {
            method: 'POST',
            body: JSON.stringify(dataForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.href = 'http://localhost:9090'; // костыль
    }

    init();
})();