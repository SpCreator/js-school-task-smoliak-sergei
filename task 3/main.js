(function() {
    function chechString() {
        let inputStr = prompt('Enter string:');
        if (!inputStr || inputStr.length < 1 || inputStr.length > 104) return;

        str = inputStr.split('');
        
        for (let i = 0; i < str.length; i++) {
            if (str.length >= 2) {
                if ((str[i] === '(' && str[i+1] === ')') 
                || (str[i] === '[' && str[i+1] === ']') 
                || (str[i] === '{' && str[i+1] === '}')) {
                    str.splice(i, 2);
                    if (str.length === 0) {
                        alert(true);
                    }
                    i--;
                } else {
                    alert(false);
                    return;
                }
            } else {
                alert(false);
            }
        }
    }

    chechString();
})();