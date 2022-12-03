import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const binop = fn => (memory, in1, in2, out) => memory[out] = fn(memory[in1], memory[in2]);

const instructions = {
    1: [3, binop((a, b) => a + b)],
    2: [3, binop((a, b) => a * b)],
    99: [0],
}

function solution(input) {
    const memory = input.split(",").map(n => +n);
    const target = 19690720;

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            memory[1] = i;
            memory[2] = j;
            const res = exec([...memory]);
            if (res === target) {
                return 100 * i + j;
            }
        }    
    }
}

function exec(memory) {
    let ip = 0;
    while (true) {
        const opcode = memory[ip++];
        const [paramNum, op] = instructions[opcode];
        const params = memory.slice(ip, ip += paramNum);
        if (!op) {
            return memory[0];
        }
        op(memory, ...params);
    }
}

console.log(solution(input)); // 9342
