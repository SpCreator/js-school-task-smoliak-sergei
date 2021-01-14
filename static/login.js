(function() {
    document.querySelector("#login-from").addEventListener('submit', async function(e) {
        const login = document.querySelector("#login");
        const password = document.querySelector("#password");
        const checking = checkingData(login.value, password.value);

        e.preventDefault();
        
        const finCheck = await checkingHelper(checking);

        if (finCheck) {
          document.location.href = "http://localhost:9090";
        } else return;
    });

    checkingData = async (login, password) => {
        let checking = await fetch('http://localhost:9090/checking', {
            method: 'POST',
            body: JSON.stringify(
              {
                  login: login,
                  password: password
              }
            ),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        return resChecking = await checking.json();
    }

    checkingHelper = async (resCheck, e) => {
        const data = await resCheck;
        const checkingLogin = document.querySelector(".checking-login");
        const checkingPassword = document.querySelector(".checking-password");

        if (checkingLogin.style.display === "block") checkingLogin.style.display = "none";
        if (checkingPassword.style.display === "block") checkingPassword.style.display = "none";
        if (data.login === false) checkingLogin.style.display = "block";
        if (data.password === false) checkingPassword.style.display = "block";
        if (data.login === true && data.password === true) return true;
    }
})();
