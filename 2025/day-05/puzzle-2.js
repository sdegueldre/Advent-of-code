import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, mergeRanges } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 14]];

export function solve(input) {
    let [ranges, ingredients] = input.split("\n\n");
    ranges = ranges.split("\n").map(l => l.split("-").map(n => +n));
    return sum(mergeRanges(ranges).map(([l, r]) => r - l + 1));
}
export const solution = 352716206375547;
