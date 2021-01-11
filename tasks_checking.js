const task1 = require("./tasks/task1.js");
const task2 = require("./tasks/task2.js");
const task3 = require("./tasks/task3.js");
const task4 = require("./tasks/task4.js");
const task5 = require("./tasks/task5.js");

console.log(task1.conversionNum("MMMCMXCIX"));
console.log(task2.polyindromeСheck(123454321));
console.log(task3.checkingString("()()(){}{}{}{}[][][][]"));
console.log(task4.combine({
    arr1: [2, 3, 1, 3, 2, 4, 100, 6, 20, 7, 9, 2, 19],
    arr2: [2, 1, 4, 3, 9, 100]
}));
console.log(task5.checkingArr({
    arr: [1, 3, 5, 6, 8, 10, 11, 13, 14],
    req: 5
}));
