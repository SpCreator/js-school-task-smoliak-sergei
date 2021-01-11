const errors = require("../errors.js");

(function()  {
    const MIN_ARR_VALUE = 0;
    const MAX_ARR_VALUE = 1000;
    const MIN_ARR_LENGTH = 1;
    const MAX_ARR_LENGTH = 1000;

    checkingArr = input => {
        let result = '';

        let checking = checkHelper(input);

        if (!checking) return false;
    
        if (input.arr.includes(input.req)) {
            result = input.arr.indexOf(input.req);
        } else {
            input.arr.push(input.req);
            input.arr.sort(function sortNumber(num1, num2) {
                return num1 - num2;
            });

            result = input.arr.indexOf(input.req);
        }
        
        return result;
    }
    
    checkHelper = input => {
        if (!input.arr) {
            errors.errors("arr");
            return false;
        }

        if (!input.req) {
            errors.errors("index");
            return false;
        }
        
        if (input.req < 0 || input.req > 999 || input.req > (input.arr.length)) {
            errors.errors("indexNum");
            return false;
        }
        
        if (input.req.length < MIN_ARR_LENGTH || input.req.length > MAX_ARR_LENGTH) {
            errors.errors("arrLength");
            return false;
        }

        for (let elem of input.arr) {
            if (elem < MIN_ARR_VALUE) {
                errors.errors("lessThan");
                return false;
            }
            if (elem > MAX_ARR_VALUE) {
                errors.errors("moreThan");
                return false;
            }
        }

        if (!input.req || typeof input.req != "number") {
            errors.errors("number", typeof input.req);
            return false;
        }

        return true;
    }
    module.exports = {checkingArr};
})();