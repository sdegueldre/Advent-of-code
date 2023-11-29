import { assertEqual, getInputs, sum } from "../../utils.js";
export const { input, testInput } = getInputs(import.meta.url);

export const testCases = [
    { input: testInput, expected: 24000 },
];

export function solve(input) {
    return Math.max.apply(Math, input.split("\n\n").map(lines => sum(lines.split("\n").map(n => parseInt(n)))));
}
export const solution = 71124;


