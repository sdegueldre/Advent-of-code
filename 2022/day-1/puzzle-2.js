const { readFileSync } = require("fs");
const { sum } = require("../utils");

const input = readFileSync("./input").toString().trim();
const testInput = readFileSync("./input_test").toString().trim();

function solution(input) {
    return sum(input.split("\n\n")
        .map(lines => sum(lines.split("\n").map(n => parseInt(n))))
        .sort((a, b) => b - a)
        .slice(0, 3));
}

console.assert(solution(testInput) === 45000);

console.log(solution(input)); // 204639
