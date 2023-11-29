import { assertEqual, getInputs, extractLines, window } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    return window([...input], 14).findIndex((w) => new Set(w).size === 14) + 14;
}

assertEqual(testInput.split("\n").map(solution), [19, 23, 23, 29, 26]);
console.log(solution(input)); // 2823
