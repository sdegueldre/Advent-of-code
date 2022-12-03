import { assertEqual, getInputs, sum, mod } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const facings = [
    [ 0,  1], // N
    [ 1,  0], // E
    [ 0, -1], // S
    [-1,  0], // W
];
function solution(input) {
    return input.split("\n")
        .map(l => sum(l.split(", ")
            .reduce((acc, instruction) => {
                const [dir, num] = [instruction[0], instruction.slice(1)];
                acc.facing = mod(acc.facing + (dir === "R" ? 1 : -1), 4);
                acc.pos = acc.pos.map((v, i) => v + num * facings[acc.facing][i]);
                return acc;
            }, {
                pos: [0, 0],
                facing: 0,
            }).pos.map(coord => Math.abs(coord)))
        );
}

assertEqual(solution(testInput), [5, 2, 12]);
console.log(solution(input)); // 279
