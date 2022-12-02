import { assertEqual, getInputs, sum } from "../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const toNum = char => "ABCXYZ".indexOf(char) % 3;
const score = ([opponent, outcome]) => outcome * 3 + ((opponent + (outcome - 1) + 3) % 3) + 1;
function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.split(" ").map(toNum))
            .map(score)
    );
}

assertEqual(solution(testInput), 12);
console.log(solution(input)); // 11258
