const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    let ages = counter(input.split(',').map(n => +n));
    for (let i = 0; i <= 8; i++) ages[i] = ages[i] || 0;
    for (let day = 0; day < 256; day++) {
        ages = {
            0: ages[1],
            1: ages[2],
            2: ages[3],
            3: ages[4],
            4: ages[5],
            5: ages[6],
            6: ages[7] + ages[0],
            7: ages[8],
            8: ages[0],
        }
    }
    return sum(Object.values(ages));
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));