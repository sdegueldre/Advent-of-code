import { assertEqual, counter, getInputs, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function matchesPolicy(password, policy) {
    const [a, b, char] = policy.split(/-| /);
    return +(password[a - 1] === char) ^ +(password[b - 1] === char);
}

function solution(input) {
    return input.split("\n")
        .map(l => l.split(": "))
        .filter(([policy, password]) => matchesPolicy(password, policy))
        .length;
}

assertEqual(solution(testInput), 1);
console.log(solution(input)); // 588
