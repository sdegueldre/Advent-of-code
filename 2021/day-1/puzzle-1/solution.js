const { readFileSync } = require("fs");
const { group } = require("../../utils");
const { resolve } = require("path");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    return group(
            input.split("\n").map(n => parseInt(n, 10)),
            2,
        ).filter(([a, b]) => b > a).length;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input)); //1139
