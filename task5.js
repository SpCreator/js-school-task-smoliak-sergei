module.exports = (input) => {
    function checkArr(input) {
        let arr = [1, 3, 5, 6, 8, 10, 11, 13, 14];

        if (!input) return;

        if (arr.includes(input)) {
            return `INDEX: ${arr.indexOf(input)}`;
        } else {
            arr.push(input);
            arr.sort(function sortNumber(num1, num2) {
                return num1 - num2;
            });

            return `INDEX: ${arr.indexOf(input)}`;
        }

    }

    return `Task 5: ${checkArr(input)}`;
};