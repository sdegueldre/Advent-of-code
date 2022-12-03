import { assertEqual, counter, getInputs, product, zip, sum, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return product(
        zip(
            ...input.split("\n")
                .map(counter)
                .map(c => [
                    Object.values(c).find(v => v === 2) ? 1 : 0,
                    Object.values(c).find(v => v === 3) ? 1 : 0,
                ])
        )
        .map(sum)
    )
}

assertEqual(solution(testInput), 12);
console.log(solution(input)); // 7936
