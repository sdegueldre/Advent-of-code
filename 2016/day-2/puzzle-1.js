import { assertEqual, getInputs, zip, sum, constrain } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const offset = {
    R: [ 0,  1],
    L: [ 0, -1],
    U: [-1,  0],
    D: [ 1,  0],
};
const nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
function solution(input) {
    let pos = [1, 1];
    let combo = [];
    for(const line of input.split("\n")) {
        for (const move of line) {
            pos = zip(pos, offset[move]).map(sum).map(constrain(0, 2));
        }
        combo.push(nums[pos[0]][pos[1]]);
    }
    return combo.join("");
}

assertEqual(solution(testInput), "1985");
console.log(solution(input)); // 33444
