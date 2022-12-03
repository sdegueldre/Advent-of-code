import { assertEqual, getInputs, zip, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const offsets = {
    "^": [ 0,  1],
    ">": [ 1,  0],
    "<": [-1,  0],
    "v": [ 0, -1],
}
function solution(input) {
    let position = [0, 0];
    let visited = new Set(["0,0"]);
    for (const dir of input) {
        position = zip(position, offsets[dir]).map(sum);
        visited.add(position.join());
    }
    return visited.size;
}

assertEqual(testInput.split("\n").map(solution), [2, 4, 2]);
console.log(solution(input)); // 2572
