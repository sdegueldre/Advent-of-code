import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .map(l => [...l].map(c => c === "(" ? 1 : -1))
        .map(sum);
}

assertEqual(solution(testInput), [0, 0, 3, 3, 3, -1, -1, -3, -3]);
console.log(solution(input)); // 138
