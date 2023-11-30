import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, magicParse } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [
    [testInput, 34 + 14],
];

export function solve(input) {
    let total = 0;
    for (const [w, l, h] of magicParse(input, "x")) {
        const sides = [w+l, l+h, w+h];
        total += Math.min(...sides) * 2 + l*w*h;
    }
    return total;
}
export const solution = undefined;