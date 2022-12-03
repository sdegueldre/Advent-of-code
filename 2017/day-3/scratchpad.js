import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    input = +input;
    const squareNum = Math.ceil(Math.sqrt(input) / 2 - 0.5);
    let pos = [squareNum, squareNum];
    
}

const testInput = `1
12
23
1024`
assertEqual(testInput.split("\n").map(solution), [0, 3, 2, 21]);
console.log(solution(input)); // output
