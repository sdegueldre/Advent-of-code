const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const positions = input.split(',').map(n => +n).sort((a, b) => a - b);
    const fuelCosts = Array(Math.max(...positions)).fill().map((_, targetPos) => {
        return sum(positions.map(p => fuelCost(Math.abs(targetPos - p))));
    });
    return Math.min(...fuelCosts);
}

function fuelCost(dist) {
    return dist * (dist + 1) * .5;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));