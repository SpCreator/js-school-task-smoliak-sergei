const errors = require("../errors.js");

(function() {
    const MIN_ARR_VALUE = 0;
    const MAX_ARR_VALUE = 1000;
    const MIN_ARR_LENGTH = 1;
    const MAX_ARR_LENGTH = 1000;
    
    // General function.
    combine = (data) => {
        if (checkingArrayLength(data.arr1, data.arr2) === false) return false;

        let diffArr = data.arr1.filter(i => !data.arr2.includes(i));

        if (!checking(data.arr1, data.arr2, diffArr)) return false;

        let newArr = [];
        
        for (let elemArr2 of data.arr2) {
            let partArray = addToGroup(newArr, elemArr2, data.arr1);

            if (!Array.isArray(partArray)) return false;

            newArr.concat(partArray);
        }

        diffArr = diffSort(diffArr);
        newArr = concatArrs(newArr, diffArr);
        
        return newArr;
    }

    // Grouping the same numbers.
    addToGroup = (newArr, elemArr2, arr1) => {
        let countNum = counElementSearch(elemArr2, arr1);

        if (countNum) {
            for (let i = 0; i < countNum; i++) {
                newArr.push(elemArr2);
            }
        }
        
        return newArr;
    }

    // Helper to the addToGroup(). Calculating the number of repetitions.
    counElementSearch = (elemArr2, arr1) => {
        let count = 0;

        for (let elemArr1 of arr1) {
            if (elemArr1 >= MIN_ARR_VALUE && elemArr1 <= MAX_ARR_VALUE) {
                if (elemArr2 === elemArr1) {
                    count++;
                }
            } else {
                return false;
            }

        }
        
        return count;
    }

    // Sorting different numbers.
    diffSort = arr => {
        arr.sort(function sortNumber(elem1, elem2) {
            return elem1 - elem2;
        });

        return arr;
    }

    // Arrays concating/
    concatArrs = (newArr, diffArr) => {
        if (newArr.length > MIN_ARR_LENGTH) {
            return newArr.concat(diffArr);
        } else {
            errors.errors("empty");
            return false;
        }
    }

    // Verification of compliance with conditions.
    checking = (arr1, arr2, diffArr) => {
        if (!checkingArrayLength(arr1, arr2) 
        || !numberRangeCheckArr2(arr1, arr2)  
        || !numberRangeCheckArr1(arr1, arr2)  
        || !checkingElements(arr1, arr2) 
        || !checkingDuplicateValues(arr2) 
        || !checkingDifferenceArray(diffArr)) return false;
        return true;
    }

    // Number range check arr1.
    numberRangeCheckArr1 = arr1 => {
        for (let elemArr1 of arr1) {
            if (elemArr1 < MIN_ARR_VALUE) {
                errors.errors("lessThan", "#1");
                return false;
            } else if (elemArr1 > MAX_ARR_VALUE) {
                errors.errors("moreThan", "#1");
                return false;
            }
        }
        
        return true;
    }

    // Number range check arr2.
    numberRangeCheckArr2 = arr2 => {
        for (let elemArr2 of arr2) {
            if (elemArr2 < MIN_ARR_VALUE) {
                errors.errors("lessThan", "#2");
                return false;
            } else if (elemArr2 > MAX_ARR_VALUE) {
                errors.errors("moreThan", "#2");
                return false;
            }
        }
        
        return true;
    }

    // Checking the convergence of arrays.
    checkingDuplicateValues = arr2 => {
        let count = 0;
        for (let elem of arr2) {
            count += arr2.filter((item) => item === elem).length;
        }
        
        if (count != arr2.length) {
            errors.errors("duplicate", 2);
            return false;
        }

        return true;
    }

    // Checking array differences.
    checkingDifferenceArray = diffArr => {
        if (diffArr.length === 0) {
            errors.errors("difference");
            return false;
        }

        return true;
    }

    // Checking for the presence of elements of one array in the second.
    checkingElements = (arr1, arr2) => {
        for (let num of arr2) {
            if (!arr1.includes(num)) {
                errors.errors("persistence");
                return false;
            }
        }

        return true;
    }

    // Checking the length of an array.
    checkingArrayLength = (arr1, arr2) => { // 
        if (arr1.length < MIN_ARR_LENGTH || arr1.length > MAX_ARR_LENGTH) {
            errors.errors("arrLength", "#1");
            return false;
        } else if (arr2.length < MIN_ARR_VALUE || arr2.length > MAX_ARR_VALUE) {
            errors.errors("arrLength", "#2");
            return false;
        }
        
        return true;
    }

    module.exports = {combine};
})();