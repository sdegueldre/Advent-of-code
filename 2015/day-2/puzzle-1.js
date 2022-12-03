import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.split("x").map(n => +n))
            .map(([l, w, h]) => 2*l*w + 2*w*h + 2*h*l + l*w*h/Math.max(l, w, h))
    );
}

assertEqual(solution(testInput), 101);
console.log(solution(input)); // 1606483
