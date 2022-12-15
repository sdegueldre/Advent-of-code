import { assertEqual, getInputs, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const isIn = (min, max) => n => n >= min && n <= max;
function solution(input) {
    return input.split("\n")
        .map(l => l.split(",").map(p => p.split("-").map(n => +n)))
        .filter(([[a, b], [c, d]]) => isIn(c, d)(a) || isIn(c, d)(b) || isIn(a, b)(c) || isIn(a, b)(d))
        .length;
}

assertEqual(solution(testInput), 4);
console.log(solution(input)); // 891
