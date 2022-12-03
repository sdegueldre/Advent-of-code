import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const nums = new Set(input.split("\n").map(n => +n));
    for (const num1 of nums) {
        for (const num2 of nums) {
            if (nums.has(2020 - num1 - num2)) {
                return num1 * num2 * (2020 - num1 - num2);
            }
        }
    }
}

assertEqual(solution(testInput), 241861950);
console.log(solution(input)); // 1013211
