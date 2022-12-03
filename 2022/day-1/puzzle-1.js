import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return Math.max.apply(Math, input.split("\n\n").map(lines => sum(lines.split("\n").map(n => parseInt(n)))));
}

assertEqual(solution(testInput), 24000);
console.log(solution(input)); // 71124
