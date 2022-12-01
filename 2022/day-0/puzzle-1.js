const { readFileSync } = require("fs");
const {} = require("../utils");

const input = readFileSync("./input").toString().trim();
const testInput = readFileSync("./input_test").toString().trim();

function solution(input) {
    return input;
}

console.assert(solution(testInput) === placeholder);

console.log(solution(input)); // output
