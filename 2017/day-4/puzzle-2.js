import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .filter(l => {
            const words = l.split(" ").map(w => [...w].sort().join(""));
            return words.length === new Set(words).size;
        })
        .length;
}

assertEqual(solution(testInput), 5);
console.log(solution(input)); // output
