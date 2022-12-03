import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return sum(input.split("\n").map(mass => (mass / 3 | 0) - 2));
}

assertEqual(solution(testInput), 34241);
console.log(solution(input)); // 3372695
