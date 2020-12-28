// Двойное сравнивание, как в требовании "-2**31 <= x <= 2**31 - 1", непредсказуемое и не выполняется как нужно.
// По крайней мере у меня условие не пропускало цифру в проверяемом диапазоне.

(function() {
  function polyindromeСheck() {
    let incomData = +prompt("Enter number:");

    if (!incomData) return;

    const data = incomData;
    
    if (-(2**31) <= incomData && incomData <= 2**31 - 1) {
      alert((data === +(incomData.toString().split("").reverse().join(""))));
    } else alert("Неверное число ввода!");
  }

  polyindromeСheck();
})();


// Я немного расширил функционал, и теперь на полиндром проверяется как число так и строка.
// (function() {
//   function polyindromeСheck(incomData) {
//     const data = incomData;
    
//     if (typeof incomData === 'number') {
//       reverceNum(data, incomData);
//     } else if (typeof incomData === 'string') {
//       reverceStr(data, incomData);
//     }
//   }

//   function reverceNum(data, incomData) {
//     if (-(2**31) <= incomData && incomData <= 2**31 - 1) {
//        alert(`Number: ${(data === +(incomData.toString().split("").reverse().join("")))}`);
//     } else alert(" Неверное число ввода!");
//   }

//   function reverceStr(data, incomData) {
//     alert(`String: ${incomData.split("").reverse().join("") === data}`);
//   }

//   polyindromeСheck(121); // number
//   polyindromeСheck('lol'); // string
// })();
