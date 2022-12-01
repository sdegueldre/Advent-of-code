import { readFileSync } from "fs";
import { sum } from "../utils.js";

const input = readFileSync("./input").toString().trim();
const testInput = readFileSync("./input_test").toString().trim();

function solution(input) {
    return Math.max.apply(Math, input.split("\n\n").map(lines => sum(lines.split("\n").map(n => parseInt(n)))));
}

console.assert(solution(testInput) === 24000);

console.log(solution(input)); // 71124
