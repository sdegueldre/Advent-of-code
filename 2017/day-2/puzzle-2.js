import { assertEqual, getInputs, sum, logThrough } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.split(/\s/).map(n => +n))
            .map(l => {
                // O(n²) seems awful but not sure it can be improved
                for (let i = 0; i < l.length; i++) {
                    for (let j = i + 1; j < l.length; j++) {
                        if (l[i] % l[j] === 0) {
                            return l[i] / l[j];
                        } else if (l[j] % l[i] === 0) {
                            return l[j] / l[i];
                        }
                    }
                }
            })
    );
}
const testInput = `5 9 2 8
9 4 7 3
3 8 6 5`
assertEqual(solution(testInput), 9);
console.log(solution(input)); // 53460
