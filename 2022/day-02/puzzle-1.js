import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const toNum = char => "ABCXYZ".indexOf(char) % 3;
// draw, win, loss
const scores = [3, 6, 0];
const score = ([opponent, you]) => 1 + you + scores[(you + 3 - opponent) % 3];
function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.split(" ").map(toNum))
            .map(score)
    );
}

assertEqual(solution(testInput), 15);
console.log(solution(input)); // 14531
