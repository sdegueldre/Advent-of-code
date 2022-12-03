import { assertEqual, counter, getInputs, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function matchesPolicy(password, policy) {
    const [min, max, char] = policy.split(/-| /);
    const count = counter(password)[char];
    return count >= +min && count <= +max;
}

function solution(input) {
    return input.split("\n")
        .map(l => l.split(": "))
        .filter(([policy, password]) => matchesPolicy(password, policy))
        .length;
}

assertEqual(solution(testInput), 2);
console.log(solution(input)); // 636
