import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, mod } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const lines = input.split("\n").map((n, i) => [i, +n]);
    for (let i = 0; i < lines.length; i++) {
        const toMove = lines.findIndex(([origIndex]) => origIndex === i);
        const item = lines[toMove];
        const amount = item[1];
        lines.splice(lines.indexOf(item), 1);
        lines.splice(mod(toMove + amount, lines.length), 0, [...item]);
    }
    const indexOfZero = lines.findIndex(item => item[1] === 0);
    return sum([1000, 2000, 3000].map(item => lines[mod(item + indexOfZero, lines.length)][1]));
}

assertEqual(solution(testInput), 3);
console.log(solution(input)); // 13522
