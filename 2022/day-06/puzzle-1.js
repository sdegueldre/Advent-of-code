import { assertEqual, getInputs, extractLines, window } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    return window([...input], 4).findIndex((w) => new Set(w).size === 4) + 4;
}

assertEqual(testInput.split("\n").map(solution), [7, 5, 6, 10, 11]);
console.log(solution(input)); // 1850
