import { assertEqual, getInputs, zip, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

const dirs = [
    [ 1,  0],
    [ 0,  1],
    [-1,  0],
    [ 0, -1],
]
function solution(input) {
    input = input - 1;
    let pos = [0, 0];
    for (let dir = 0;; dir++) {
        for (let i = 1; i < ((dir + 2) / 2 | 0); i++, input--) {
            if (input === 0) {
                return sum(pos.map(Math.abs));
            }
            pos = zip(pos, dirs[dir%4]).map(sum);
        }
    }
}

const testInput = `1
12
23
1024`
assertEqual(testInput.split("\n").map(solution), [0, 3, 2, 31]);
console.log(solution(input)); // 475
