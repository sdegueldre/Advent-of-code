import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const lines = input.split("\n").map(l => l.split(" "));
    let x = 1;
    let cycle = 1;
    let signalStrength = 0;
    const checkCycle = () => {
        const c = cycle;
        if ((c-20) % 40 == 0) {
            signalStrength += c * x;
        }
    }
    for (const [instruction, arg] of lines) {
        cycle++;
        checkCycle()
        if (instruction === "addx") {
            x += +arg;
            cycle++;
            checkCycle()
        }
    }
    return signalStrength;
}

assertEqual(solution(testInput), 13140);
console.log(solution(input)); // 12540
