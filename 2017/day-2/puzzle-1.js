import { assertEqual, getInputs, sum, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.split(/\s/).map(n => +n))
            .map(l => Math.max(...l) - Math.min(...l))
    );
}

assertEqual(solution(testInput), 18);
console.log(solution(input)); // 53460
