const errors = require("../errors.js");

(function() {
    const MIN_INPUT_VALUE   = "I";
    const MAX_INPUT_VALUE   = "MMMCMXCIX";
    const MIX_INPUT_LENGTH  = 1;
    const MAX_INPUT_LENGTH  = 15;

    const SIMPLE = {
        'M': 1000,
        'D': 500,
        'C': 100,
        'L': 50,
        'X': 10,
        'V': 5,
        'I': 1
    };

    const COMPLICATED = {
        'CM': 900,
        'CD': 400,
        'XC': 90,
        'XL': 40,
        'IX': 9,
        'IV': 4
    }

    // General function.
    conversionNum = inputData => {
        result = 0;

        if (!inputData || typeof inputData != "string") {
            errors.errors("inputData", inputData);
            return false;
        }

        if (inputData.length < MIX_INPUT_LENGTH || inputData.length > MAX_INPUT_LENGTH) {
            errors.errors("minxMaxLength", inputData.length, MIX_INPUT_LENGTH, MAX_INPUT_LENGTH);
            return false;
        }

        if (inputData.length === 1) {
            result = SIMPLE[inputData];
            return result;
        } else result = prepareResult(inputData);

        if (!result) return false;

        if (1 <= result && result <= 3999) return result;
        else {
            errors.errors("minxMaxInteger", inputData, MIN_INPUT_VALUE, MAX_INPUT_VALUE);
            return false;
        }
    }

    // Heler for the conversationNum().
    prepareResult = inputData => {
        let result = 0;

        for (let i = 0; i <= inputData.length - 1; i++) {
            const simpleNum = inputData[i];
            const complicatedNum = inputData[i] + inputData[i + 1];

            if (COMPLICATED[complicatedNum]){
                result += COMPLICATED[complicatedNum];
                i++;
            } else if (SIMPLE[simpleNum]) result += SIMPLE[simpleNum];
            else {
                errors.errors("errorNum", simpleNum);
                return false;
            }
        }

        return result;
    }

    module.exports = {conversionNum};
})();