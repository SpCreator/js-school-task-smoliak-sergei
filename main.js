(() => {
    let btnTask1 = document.querySelector(".task1");
    let btnTask2 = document.querySelector(".task2");
    let btnTask3 = document.querySelector(".task3");
    let btnTask4 = document.querySelector(".task4");
    let btnTask5 = document.querySelector(".task5");

    btnTask1.addEventListener("click", () => task1());
    btnTask2.addEventListener("click", () => task2());
    btnTask3.addEventListener("click", () => task3());
    btnTask4.addEventListener("click", () => task4());
    btnTask5.addEventListener("click", () => task5());
})();

task1 = async () => {
    const data = prompt("Введите римскую цифру:");

    const response = await fetch('http://localhost:9090/task1', {
        method: 'POST',
        body: JSON.stringify({input: data}),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let userData = await response.json();

    alert(userData.res);
}

task2 = async () => {
    const data = +prompt("Введите цифру для проверки на полиндром:");

    const response = await fetch('http://localhost:9090/task2', {
        method: 'POST',
        body: JSON.stringify({input: data}),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let userData = await response.json();

    alert(userData.res);
}

task3 = async () => {
    const data = prompt("Введите строку состоящую из скобок {}()[] для проверки:");

    const response = await fetch('http://localhost:9090/task3', {
        method: 'POST',
        body: JSON.stringify({input: data}),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let userData = await response.json();

    alert(userData.res);
}

task4 = async () => {
    const dataArr1 = prompt("Введите для сверки Массив №1 из целых чисел через запяту, без квадратных скобок:");
    const dataArr2 = prompt("Введите для сверки Массив №2 из целых чисел через запяту, без квадратных скобок:");
    
    let arr1 = dataArr1.split(",");
    let arr2 = dataArr2.split(",");

    const response = await fetch('http://localhost:9090/task4', {
        method: 'POST',
        body: JSON.stringify({
            input: {
                arr1: arr1,
                arr2: arr2
        }}),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let userData = await response.json();

    alert(userData.res);
}

task5 = async () => {
    const arrData = prompt("Введите Массив из целых чисел через запяту, без квадратных скобок:");
    const indexData = +prompt("Для получения индекса чиисла из массива, введите это число:");
    
    let arr = arrData.split(",");

    const response = await fetch('http://localhost:9090/task5', {
        method: 'POST',
        body: JSON.stringify({
            input: {
                arr: arr,
                req: indexData
        }}),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let userData = await response.json();

    alert(userData.res);
}