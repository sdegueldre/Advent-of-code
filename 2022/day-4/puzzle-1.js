import { assertEqual, getInputs, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .map(l => l.split(",").map(p => p.split("-").map(n => +n)))
        .filter(([[a, b], [c, d]]) => a <= c && b >= d || c <= a && d >= b)
        .length;
}

assertEqual(solution(testInput), 2);
console.log(solution(input)); // 602
