import { assertEqual, getInputs, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .map(l => [...l].map(d => +d)
            .filter((digit, i, digits) => digit === digits[(i + 1) % digits.length])
        )
        .map(sum);
}

const testInput = "1122\n1111\n1234\n91212129"
assertEqual(solution(testInput), [3, 4, 0, 9]);
console.log(solution(input)); // 1343
