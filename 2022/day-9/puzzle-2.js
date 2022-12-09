import { assertEqual, getInputs, sum, zip, getNums, extractLines, dist } from "../../utils.js";
const { input } = getInputs(import.meta.url);


const dirMap = {
    "U": [ 1, 0],
    "D": [-1, 0],
    "R": [ 0, 1],
    "L": [ 0,-1],
}
let visited;
function solution(input) {
    const commands = extractLines(input, /(\w) (\d+)/, ["dir", "amount"]);
    visited = new Set(["0,0"]);
    let positions = [...Array(10)].map(_ => [0, 0]);
    for (const { dir, amount } of commands) {
        for(let i = 0; i < +amount; i++) {
            move(positions, 0, zip(positions[0], dirMap[dir]).map(sum));
        }
    }
    return visited.size;
}

function move(arr, i, nextPos) {
    arr[i] = nextPos;
    if (i === arr.length - 1) {
        visited.add(nextPos.join());
    }
    if (i < arr.length - 1 && dist(nextPos, arr[i+1]) >= 1.5) {
        const diff = zip(nextPos, arr[i+1]).map(([a, b]) => a - b);
        const movement = diff.map(offset => Math.sign(offset));
        move(arr, i + 1, zip(arr[i + 1], movement).map(sum));
    }
}

const testInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
assertEqual(solution(testInput), 36);
console.log(solution(input)); // 2793
