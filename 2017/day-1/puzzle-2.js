import { assertEqual, getInputs, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .map(l => [...l].map(d => +d)
            .filter((digit, i, digits) => digit === digits[(i + digits.length / 2) % digits.length])
        )
        .map(sum);
}

const testInput = "1212\n1221\n123425\n123123\n12131415"
assertEqual(solution(testInput), [6, 0, 4, 12, 4]);
console.log(solution(input)); // 1274
