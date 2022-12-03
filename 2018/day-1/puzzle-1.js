import { assertEqual, getInputs, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n\n").map(l =>  l.split("\n")
        .map(n => +n)
    )
    .map(sum);
}

const testInput = `+1\n-2\n+3\n+1\n
+1\n+1\n+1\n
+1\n+1\n-2\n
-1\n-2\n-3`
assertEqual(solution(testInput), [3, 3, 0, -6]);
console.log(solution(input)); // 518
