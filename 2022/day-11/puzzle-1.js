import { assertEqual, getInputs, getNums, logThrough, pyRange, product } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const blocks = input.split("\n\n");
    let monkeys = blocks.map(b => {
        const [monkey, items, operation, test, ifTrue, ifFalse] = b.split("\n").map(l => l.trim());
        const [l, operator, r] = operation.split("=")[1].trim().split(" ");
        return {
            id: getNums(monkey)[0],
            items: getNums(items),
            op: old => {
                const left = l === "old" ? old : +l;
                const right = r === "old" ? old : +r;
                return operator === "+" ? left + right : left * right;
            },
            divisible: getNums(test)[0],
            ifTrue: getNums(ifTrue)[0],
            ifFalse: getNums(ifFalse)[0],
            inspected: 0,
        };
    });
    monkeys = Object.fromEntries(monkeys.map(m => [m.id, m]).sort(([a], [b]) => a - b));
    for (let i = 0; i < 20; i++) {
        for (const monkey of Object.values(monkeys)) {
            for (let item of monkey.items) {
                monkey.inspected++;
                item = (monkey.op(item) / 3) | 0;
                const target = item % monkey.divisible ? monkey.ifFalse : monkey.ifTrue; 
                monkeys[target].items.push(item);
            }
            monkey.items = [];
        }
    }
    return product(Object.values(monkeys).map(m => m.inspected).sort((a, b) => a - b).slice(-2));
}

assertEqual(solution(testInput), 10605);
console.log(solution(input)); // 117640
