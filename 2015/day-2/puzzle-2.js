import { assertEqual, getInputs, product, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.split("x").map(n => +n))
            .map((dims) => (sum(dims) - Math.max(...dims)) * 2 + product(dims))
    );
}

assertEqual(solution(testInput), 48);
console.log(solution(input)); // 3842356
