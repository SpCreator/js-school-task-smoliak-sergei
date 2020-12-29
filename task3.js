module.exports = (input) => {
    function chechString(input) {
        if (!input || input.length < 1 || input.length > 104) return;

        str = input.split('');
        
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
                    return;
                }
            } else {
                return false;
            }
        }
    }

    return `Task 3: ${chechString(input)}`;
};