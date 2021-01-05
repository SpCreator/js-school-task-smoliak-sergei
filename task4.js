// Скрипт умеет отлавливать ошибки на несоответствие требованиям, например, присутствие отрицательного числа в массиве или нет одного числа массива 1 в массиве 2.
// Обработка ошибок выглядит хоть и не лучшим решением, но работает.

(function() {
    // General function.
    combine = (arr2) => {
        let arr1 = [2, 3, 1, 3, 2, 4, 100, 6, 20, 7, 9, 2, 19];

        if (checkingArrayLength(arr1, arr2) === false) return;

        let diffArr = arr1.filter(i => !arr2.includes(i));

        if (!checking(arr1, arr2, diffArr)) return "Task 4: false";

        let newArr = [];
        
        for (let elemArr2 of arr2) {
            let partArray = addToGroup(newArr, elemArr2, arr1);

            if (!Array.isArray(partArray)) return;

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
            if (elemArr1 >= 0 && elemArr1 <= 1000) {
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
        if (newArr.length > 1) {
            return newArr.concat(diffArr);
        } else {
            let error = errors();
            console.log(error.empty);
            return;
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
            if (elemArr1 < 0) {
                let error = errors(1);
                console.log(error.lessThan);
                return;
            } else if (elemArr1 > 1000) {
                let error = errors(1);
                console.log(error.moreThan);
                return;
            }
        }
        
        return true;
    }

    // Number range check arr2.
    numberRangeCheckArr2 = arr2 => {
        for (let elemArr2 of arr2) {
            if (elemArr2 < 0) {
                let error = errors(2);
                console.log(error.lessThan);
                return;
            } else if (elemArr2 > 1000) {
                let error = errors(2);
                console.log(error.moreThan);
                return;
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
            let error = errors(2);
            console.log(error.duplicate);
            return;
        }

        return true;
    }

    // Checking array differences.
    checkingDifferenceArray = diffArr => {
        if (diffArr.length === 0) {
            let error = errors();
            console.log(error.difference);
            return;
        }

        return true;
    }

    // Checking for the presence of elements of one array in the second.
    checkingElements = (arr1, arr2) => {
        for (let num of arr2) {
            if (!arr1.includes(num)) {
                let error = errors();
                console.log(error.persistence);
                return;
            }
        }

        return true;
    }

    // Checking the length of an array.
    checkingArrayLength = (arr1, arr2) => { // 
        if (arr1.length < 1 || arr1.length > 1000) {
            let error = errors(1);
            console.log(error.length);
            return;
        } else if (arr2.length < 1 || arr2.length > 1000) {
            let error = errors(2);
            console.log(error.length);
            return;
        }
        
        return true;
    }

    // Errors resulting from compliance checks.
    errors = (add = '') => {
        return {
            persistence: 'Task 4: arr2 не содержит некоторых чисел arr1!',
            difference: 'Task 4: нежду массивами нет разницы!',
            length: `Task 4: неподходящая длина массива arr${add}!`,
            empty: 'Task 4: cлияние массивов невозможно!',
            duplicate: `Task 4: найдены повторяющиеся числа в arr${add}!`,
            moreThan: `Task 4: в массиве arr${add} найдено число больше 1000!`,
            lessThan: `Task 4: в массиве arr${add} найдено число меньше 0!`
        };
    }

    module.exports = {combine};
})();