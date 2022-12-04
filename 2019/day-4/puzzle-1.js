import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const increasing = n => [...n].every((c, i, arr) => !(c > arr[i + 1]));
function solution() {
    let possibilities = 0;
    for (let i = 124075; i <= 580769; i++) {
        const combo = i.toString();
        if (increasing(combo) && combo.match(/(\d)\1/)) {
            possibilities++;
        }
    }
    return possibilities;
}

console.log(solution()); // 2150
