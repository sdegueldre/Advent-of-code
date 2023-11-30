import { readFileSync } from "fs";
import {
    assertEqual,
    sum,
    zip,
    product,
    logThrough,
    enumerate,
    extractLines,
    magicParse,
} from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = magicParse(testInput);

export function solve(input) {
    let floor = 0;
    for (const [i, c] of enumerate(input.split(""))) {
        floor += c === "(" ? 1 : -1;
        if (floor < 0) {
            return i + 1;
        }
    }
}
export const solution = undefined;
