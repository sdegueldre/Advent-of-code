import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    return sum(input.split("\n\n")
        .map(lines => sum(lines.split("\n").map(n => parseInt(n))))
        .sort((a, b) => b - a)
        .slice(0, 3));
}

assertEqual(solution(testInput), 45000);
console.log(solution(input)); // 204639
