const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const bits = zip(...input.split('\n').map(num => num.split('').map(b => +b)));
    const gamma = bits.map(bits => +(sum(bits) > (bits.length / 2)));
    const epsilon = gamma.map(bit => +!bit);
    const asDec = arr => parseInt(arr.join(''), 2);
    return asDec(gamma) * asDec(epsilon);
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));