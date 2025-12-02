import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, multiSplit, numberize } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 4174379265]];

export function solve(input) {
    const ranges = numberize(multiSplit(input, ",", "-"));
    let invalid = 0;
    for (const [a, b] of ranges) {
        for (let i = a; i <= b; i++) {
            const n = String(i);
            if (n.match(/^(.+)\1+$/)) invalid += i;
        }
    }
    return invalid;
}
export const solution = 36862281418;
