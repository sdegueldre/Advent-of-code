import { assertEqual, getInputs, sum, chunk, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const score = charCode => charCode >= 97 ? charCode - 96 : charCode - 64 + 26;
function solution(input) {
    return sum(
        chunk(input.split("\n"), 3)
            .map(([a, b, c]) => {
                const aChars = new Set(a);
                const bChars = new Set(b);
                return [...c].find(char => aChars.has(char) && bChars.has(char));
            })
            .map(c => score(c.charCodeAt(0)))
    );
}

assertEqual(solution(testInput), 70);
console.log(solution(input)); // 2760
