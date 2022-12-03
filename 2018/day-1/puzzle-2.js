import { assertEqual, getInputs, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n\n").map(l =>  l.split("\n")
        .map(n => +n)
    )
    .map(deltas => {
        const seen = new Set([0]);
        for (let i = 0, freq = 0;; i++) {
            freq += deltas[i % deltas.length];
            if (seen.has(freq)) {
                return freq
            }
            seen.add(freq);
        }
    });
}

const testInput = `+1\n-2\n+3\n+1\n
+1\n-1\n
+3\n+3\n+4\n-2\n-4\n
-6\n+3\n+8\n+5\n-6\n
+7\n+7\n-2\n-7\n-4`

assertEqual(solution(testInput), [2, 0, 10, 5, 14]);
console.log(solution(input)); // 72889
