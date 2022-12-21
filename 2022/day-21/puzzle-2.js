import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
}
function solution(input) {
    const monkeys = Object.fromEntries(input.split("\n")
        .map(l => l.match(/(.*): (.*?)(?: (.) (.*))?$/))
        .map(([_, name, n1, op, n2]) => {
            if (op) {
                return [name, {n1, op, n2}];
            }
            return [name, {num: +n1}];
        }));
    
    monkeys.root.op = "-";
    const evaluate = (name) => {
        let res;
        if (monkeys[name].num) {
            res = monkeys[name].num;
        } else {
            const {op, n1, n2} = monkeys[name];
            res = ops[op](evaluate(n1), evaluate(n2));
        }
        return res;
    }

    const x1 = Number.MAX_SAFE_INTEGER/3;
    const x2 = -x1;
    monkeys.humn.num = x1;
    const r1 = evaluate("root");
    monkeys.humn.num = x2;
    const r2 = evaluate("root");
    // the expression involving the human is a linear function: take 2 samples and solve for x:
    // ax1 + b = r1; ax2 + b = r2
    // round because we might lose some precision.
    return Math.round((x2*r1 - x1*r2)/(r1 - r2));
}

assertEqual(solution(testInput), 301);
console.log(solution(input)); // 3305669217840
