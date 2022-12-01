const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

const maneuvers = {
    "forward": n => [n, 0],
    "up": n => [0, -n],
    "down": n => [0, n],
}
function solution(input) {
    const course = input.split('\n').map(man => man.split(' '));
    const posChanges = course.map(([command, amount]) => maneuvers[command](+amount));
    const pos = zip(zip(...posChanges).map(sum))
    return pos[0] * pos[1];
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input)); // 1815044