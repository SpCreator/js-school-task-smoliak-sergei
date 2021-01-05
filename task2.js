// Двойное сравнивание, как в требовании "-2**31 <= x <= 2**31 - 1", непредсказуемое и не выполняется как нужно.
// По крайней мере у меня условие не пропускало цифру в проверяемом диапазоне.

(function() {
  polyindromeСheck = incomData => {
    if (!incomData || typeof incomData != "number") return;

    const data = incomData;
    let result = '';

    if (-(2**31) <= incomData && incomData <= 2**31 - 1) {
      result = data === +(incomData.toString().split("").reverse().join(""));
    } else result = "Неверное число ввода!";

    return result;
  }

  module.exports = {polyindromeСheck};
})();

// Я немного расширил функционал, и теперь на полиндром проверяется как число так и строка.
// module.exports = (input) => {
//   function polyindromeСheck(input) {
//     const data = input;
//     let result = false;

//     if (typeof input === 'number') {
//       result = reverceNum(data, input);
//     } else if (typeof input === 'string') {
//       result = reverceStr(data, input);
//     }
    
//     return result;
//   }

//   function reverceNum(data, input) {
//     if (-(2**31) <= input && input <= 2**31 - 1) {
//       return `Number: ${(data === +(input.toString().split("").reverse().join("")))}`;
//     } else return " Неверное число ввода!";
//   }

//   function reverceStr(data, input) {
//     return `String: ${(data === input.split("").reverse().join(""))}`;
//   }

//   return polyindromeСheck(input);
// };
