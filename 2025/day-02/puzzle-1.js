import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, numberize, multiSplit } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1227775554]];

export function solve(input) {
    const ranges = numberize(multiSplit(input, ",", "-"));
    let invalid = 0;
    for (const [a, b] of ranges) {
        for (let i = a; i <= b; i++) {
            const n = String(i);
            const [l, r] = [n.slice(0, n.length / 2), n.slice(n.length / 2)];
            if (l === r) invalid += i;
        }
    }
    return invalid;
}
export const solution = 19605500130;
