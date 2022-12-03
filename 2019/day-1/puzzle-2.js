import { assertEqual, getInputs, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return sum(input.split("\n").map(mass => (mass / 3 | 0) - 2)
        .map(fuel => {
            let total = 0;
            while (fuel > 0) {
                total += fuel;
                fuel = (fuel / 3 | 0) - 2;
            }
            return total
        })
    );
}

const testInput = "14\n1969\n100756"
assertEqual(solution(testInput), 51314);
console.log(solution(input)); // 5056172
