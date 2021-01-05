(function() {
    checkString = input => {
        if (!input 
            || input.length < 1 
            || input.length > 104 
            || typeof input != "string") return;
            
        return checkHelper(input.split(''));
    }

    checkHelper = str => {
        for (let i = 0; i < str.length; i++) {
            if (str.length >= 2) {
                if ((str[i] === '(' && str[i+1] === ')') 
                || (str[i] === '[' && str[i+1] === ']') 
                || (str[i] === '{' && str[i+1] === '}')) {
                    str.splice(i, 2);
                    
                    if (str.length === 0) {
                        return true;
                    }
                    i--;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    module.exports = {checkString, checkHelper};
})();