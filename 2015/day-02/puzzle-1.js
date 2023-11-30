import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, magicParse } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [
    [testInput, 58 + 43],
];

export function solve(input) {
    let total = 0;
    for (const [w, l, h] of magicParse(input, "x")) {
        const sides = [w*l, l*h, w*h];
        total += sum(sides) * 2 + Math.min(...sides);
    }
    return total;
}
export const solution = undefined;