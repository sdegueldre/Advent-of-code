import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .filter(l => {
            const words = l.split(" ");
            return words.length === new Set(words).size;
        })
        .length;
}

assertEqual(solution(testInput), 7);
console.log(solution(input)); // output
