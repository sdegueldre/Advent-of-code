import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate } from "../../utils.js";
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
    return evaluate("root");
}

assertEqual(solution(testInput), 152);
console.log(solution(input)); // output
