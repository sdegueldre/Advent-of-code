import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, range, digits } from "../../utils.js";
import { solve as solve1 } from "../day-01/puzzle-1.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 281]];

export function solve(input) {
    for (const [digit, i] of Object.entries(digits)) {
        input = input.replaceAll(digit, digit[0] + i + digit.at(-1));
    }
    return solve1(input);
}
export const solution = 53312;
