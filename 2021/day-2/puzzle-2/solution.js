const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum, pairWise } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

// Positions are [horizontal, depth, aim]
const maneuvers = {
    "forward": x => aim => [x, x*aim, 0],
    "up": x => aim => [0, 0, -x],
    "down": x => aim => [0, 0, x],
}
function solution(input) {
    const course = input.split('\n').map(man => man.split(' '));
    const posChanges = course.map(([command, amount]) => maneuvers[command](+amount));
    const pos = posChanges.reduce(([horizontal, depth, aim], f) => {
        return pairWise(sum, [horizontal, depth, aim], f(aim));
    }, [0, 0, 0])
    return pos[0] * pos[1];
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input)); // 1739283308