import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const memory = input.split(",").map(n => +n);
    memory[1] = 12;
    memory[2] = 2;
    for (let i = 0; memory[i] !== 99; i += 4) {
        const [op, l, r, o] = memory.slice(i, i + 4);
        switch (op) {
            case 1:
                memory[o] = memory[l] + memory[r];
                break;
            case 2:
                memory[o] = memory[l] * memory[r];
                break;
            default:
                throw new Error(`Unexpected opcode: ${op}`);
        }
    }
    return memory[0];
}

assertEqual(solution(testInput), 1600);
console.log(solution(input)); // 2894520
