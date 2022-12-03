import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const nums = new Set(input.split("\n").map(n => +n));
    for (const num of nums) {
        if (nums.has(2020 - num)) {
            return num * (2020 - num);
        }
    }
}

assertEqual(solution(testInput), 514579);
console.log(solution(input)); // 1013211
