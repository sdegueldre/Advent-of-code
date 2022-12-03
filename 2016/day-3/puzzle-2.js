import { assertEqual, getInputs, chunk, zip } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return chunk(
        input.split("\n").map(l => l.split(/\s+/).filter(s => s !== "").map(n => +n)),
        3
    ).map(triplet => zip(...triplet))
        .flat()
        .map(tri => tri.sort((a, b) => a - b))
        .filter(([a, b, c]) => a + b > c)
        .length;
}

const testInput = 
`6 10 25
 1  2  3
 4  5  6`
assertEqual(solution(testInput), 1);
console.log(solution(input)); // 1577
