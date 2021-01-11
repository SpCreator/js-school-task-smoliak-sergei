const errors = require("../errors.js");

(function() {
    const MIN_INPUT_LENGTH  = 1;
    const MAX_INPUT_LENGTH  = 104
    const PATTERN           = ["(", ")", "[", "]", "{", "}"];
    const PATTERN_FOR_ERROR = ["()", "[]", "{}"];

    checkingString = inputData => {
        const checkingData = checkingHelper(inputData);

        if (!checkingData) return false;

        const data = inputData.split("");

        if (!data) return false;

        for (let i = 0; i < data.length; i++) {
            if (!PATTERN.includes(data[i])) {
                errors.errors("symbol", data[i], "", "", PATTERN_FOR_ERROR);
                return false;
            }
            if ((data.length - 1) === i) i = 0;
            if ((data[i] === "(" && data[i+1] === ")") 
            || (data[i] === "[" && data[i+1] === "]") 
            || (data[i] === "{" && data[i+1] === "}")) {
                data.splice(i, 2);
                if (data.length === 0) return true;
                i = 0;
            }
        }
    }

    checkingHelper = data => {
        if (typeof data != "string") {
            errors.errors("string", typeof data);
            return false;
        }

        if (data.length % 2 != 0) return false;

        if (!data 
            || data.length < MIN_INPUT_LENGTH 
            || data.length > MAX_INPUT_LENGTH) {
            errors.errors("minxMaxLength", data.length, MIN_INPUT_LENGTH, MAX_INPUT_LENGTH);
            return false;
        }

        return data;
    }

    module.exports = {checkingString};
})();