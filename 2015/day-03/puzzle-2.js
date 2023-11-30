import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, magicParse, pairSum, chunk } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = magicParse(testInput);

const dirs = {
    "^": [1, 0],
    "v": [-1, 0],
    ">": [0, 1],
    "<": [0, -1],
}
export function solve(input) {
    let pos1 = [0, 0];
    let pos2 = [0, 0];
    const seen = new Set(["0,0"]);
    for (const [a, b] of chunk(input, 2)) {
        pos1 = pairSum(pos1, dirs[a]);
        seen.add(pos1.join(","));
        if (b) {
            pos2 = pairSum(pos2, dirs[b]);
            seen.add(pos2.join(","));
        }
    }
    return seen.size;
}
export const solution = undefined;