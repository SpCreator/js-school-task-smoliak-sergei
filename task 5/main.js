(function() {
    function checkArr() {
        let arr = [1, 3, 5, 6, 8, 10, 11, 13, 14];
        let inputSearch = +prompt('Search in array [1, 3, 5, 6, 8, 10, 11, 13, 14]');

        if (!inputSearch) return;

        if (arr.includes(inputSearch)) {
            alert(`INDEX: ${arr.indexOf(inputSearch)}`);
        } else {
            arr.push(inputSearch);
            arr.sort(function sortNumber(num1, num2) {
                return num1 - num2;
            });

            alert(`INDEX: ${arr.indexOf(inputSearch)}`);
        }

    }

    checkArr();

})();