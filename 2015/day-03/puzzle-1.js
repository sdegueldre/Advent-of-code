import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, magicParse, pairSum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = magicParse(testInput);

const dirs = {
    "^": [1, 0],
    "v": [-1, 0],
    ">": [0, 1],
    "<": [0, -1],
}
export function solve(input) {
    let pos = [0, 0];
    const seen = new Set(["0,0"]);
    for (const char of input) {
        pos = pairSum(pos, dirs[char]);
        seen.add(pos.join(","));
    }
    return seen.size;
}
export const solution = undefined;