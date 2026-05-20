//Version 1: Classic
function classicFizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log(`FizzBuzz`);
        }
        else if (i % 3 === 0) {
            console.log(`Fizz`);
        }
        else if (i % 5 === 0) {
            console.log(`Buzz`);
        }
        else {
            console.log(i);
        }
    }
}

console.log(`Classic FizzBuzz`);
classicFizzBuzz();

//Version 2: Custom
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let result = "";
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) result += rules[j].word;
        }
        if (result) console.log(result);
        else console.log(i);
    }
}

console.log(`Custom FizzBuzz`);
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);