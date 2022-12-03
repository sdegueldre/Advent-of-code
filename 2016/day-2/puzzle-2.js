import { assertEqual, getInputs, zip, sum, constrain } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const offset = {
    R: [ 0,  1],
    L: [ 0, -1],
    U: [-1,  0],
    D: [ 1,  0],
};
const pad = [
  ["" , "" , "1"],
  ["" , "2", "3", "4"],
  ["5", "6", "7", "8", "9"],
  ["" , "A", "B", "C"],
  ["" , "" , "D",],
]
function solution(input) {
    let pos = [2, 0];
    let combo = [];
    for(const line of input.split("\n")) {
        for (const move of line) {
            const newPos = zip(pos, offset[move]).map(sum);
            if (pad[newPos[0]]?.[newPos[1]]) {
                pos = newPos;
            }
        }
        combo.push(pad[pos[0]][pos[1]]);
    }
    return combo.join("");
}

assertEqual(solution(testInput), "5DB3");
console.log(solution(input)); // 446A6
