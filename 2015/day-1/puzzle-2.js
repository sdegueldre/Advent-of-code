import { assertEqual, getInputs, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .map(l => [...l].map(c => c === "(" ? 1 : -1))
        .map((l, _0, _1, floor = 0) => l.findIndex(dir => (floor += dir) < 0) + 1);
}

const testInput = ")\n()())";
assertEqual(solution(testInput), [1, 5]);
console.log(solution(input)); // 1771
