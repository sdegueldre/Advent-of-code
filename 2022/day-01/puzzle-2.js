import { assertEqual, getInputs, sum } from "../../utils.js";
export const { input, testInput } = getInputs(import.meta.url);

export const testCases = [
    { input: testInput, expected: 45000 },
]

export function solve(input) {
    return sum(input.split("\n\n")
        .map(lines => sum(lines.split("\n").map(n => parseInt(n))))
        .sort((a, b) => b - a)
        .slice(0, 3));
}
export const solution = 204639;
