import { assertEqual, getInputs, zip, sum, enumerate } from "../../utils.js";
const { input } = getInputs(import.meta.url);

const offsets = {
    "^": [ 0,  1],
    ">": [ 1,  0],
    "<": [-1,  0],
    "v": [ 0, -1],
}
function solution(input) {
    let positions = [[0, 0], [0, 0]];
    let visited = new Set(["0,0"]);
    for (const [i, dir] of enumerate(input)) {
        positions[i%2] = zip(positions[i%2], offsets[dir]).map(sum);
        visited.add(positions[i%2].join());
    }
    return visited.size;
}

const testInput = `^v
^>v<
^v^v^v^v^v`;
assertEqual(testInput.split("\n").map(solution), [3, 3, 11]);
console.log(solution(input)); // 2631
