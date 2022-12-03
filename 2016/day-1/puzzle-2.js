import { assertEqual, getInputs, sum, mod } from "../../utils.js";
const { input } = getInputs(import.meta.url);

const facings = [
    [ 0,  1], // N
    [ 1,  0], // E
    [ 0, -1], // S
    [-1,  0], // W
];
function solution(input) {
    return input.split("\n")
        .map(l => {
            console.log("\n");
            const instructions = l.split(", ").map(i => [i[0], i.slice(1)]);
            const visited = new Set(["0,0"]);
            let pos = [0, 0];
            let facing = 0;
            for (const [dir, num] of instructions) {
                facing = mod(facing + (dir === "R" ? 1 : -1), 4);
                for (let i = 0; i < num; i++) {
                    pos = pos.map((v, i) => v + facings[facing][i]);
                    if (visited.has(pos.join())) {
                        return pos;
                    }
                    visited.add(pos.join());
                }
            }
        })
        .map(pos => sum(pos.map(coord => Math.abs(coord))));
}
const testInput = "R8, R4, R4, R8";
assertEqual(solution(testInput), [4]);
console.log(solution(input)); // 279
