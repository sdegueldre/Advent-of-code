const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const positions = input.split(',').map(n => +n).sort((a, b) => a - b);
    const targetPos = positions[positions.length/2];
    return sum(positions.map(p => Math.abs(p - targetPos)));
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));