(function()  {
    checkArr = input => {
        let arr = [1, 3, 5, 6, 8, 10, 11, 13, 14];
        let result = '';

        if (!input || typeof input != "number") return;
    
        if (arr.includes(input)) {
            result = arr.indexOf(input);
        } else {
            arr.push(input);
            arr.sort(function sortNumber(num1, num2) {
                result = num1 - num2;
            });
        }
        
        return result;
    }
    
    module.exports = {checkArr};
})();