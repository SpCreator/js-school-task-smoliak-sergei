// Добавлен обработчик ошибок при невыполнении требований задачи.
(function() {
    let romanSimnple = {
        'M': 1000,
        'D': 500,
        'C': 100,
        'L': 50,
        'X': 10,
        'V': 5,
        'I': 1
    };

    let romanComplicated = {
        'CM': 900,
        'CD': 400,
        'XC': 90,
        'XL': 40,
        'IX': 9,
        'IV': 4
    }

    // General function.
    conversionNum = inputData => {
        if (!inputData || typeof inputData != "string") return errorText('inputData');

        if (1 <= inputData.length && inputData.length <= 15) {
            result = 0;

            if (inputData.length === 1) {
                result = romanSimnple[inputData];
                return result;
            } else {
                result +=  prepareResult(inputData);

                if (1 <= result &&  result <= 3999) {
                    return result;
                } else {
                    errorText('bigInteger');
                }
                
            }
        } else {
            errorText('bigString');
        }
    }

    // Heler for the conversationNum().
    prepareResult = inputData => {
        let iterNum = 0;
        let result = 0;

        while (iterNum <= inputData.length - 1) {
            const simpleNum = inputData[iterNum];
            const complicatedNum = inputData[iterNum] + inputData[iterNum + 1];
            
            if (romanComplicated[complicatedNum] && inputData[iterNum + 1]){
                result += romanComplicated[complicatedNum];
                iterNum++;
            } else if (romanSimnple[simpleNum]) {
                result += romanSimnple[simpleNum];
            }

            iterNum++;
        }

        return result;
    }

    // Error store.
    errorText = error => {
        let errors =  {
            bigInteger: 'Слишком большое число! Допустимый диапазон вводимого римского числа от 1 до 3999 включительно.',
            bigString: 'Максимальное количество вводимых символов равно 15',
            inputData: 'Нет данных или неверных формат ввода'
        }

        console.log(errors[error])
    }

    module.exports = {conversionNum, prepareResult};
})();
    