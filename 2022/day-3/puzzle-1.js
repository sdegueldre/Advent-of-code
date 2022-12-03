import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const score = charCode => charCode >= 97 ? charCode - 96 : charCode - 64 + 26;
function solution(input) {
    return sum(
        input.split("\n")
            .map(l => [l.slice(0, l.length / 2), l.slice(l.length / 2)])
            .map(([l, r]) => {
                const lChars = new Set(l);
                return [...r].find(c => lChars.has(c));
            }).map(c => score(c.charCodeAt(0)))
    );
}

assertEqual(solution(testInput), 157);
console.log(solution(input)); // 7878
