import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, extractLines, magicParse } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = magicParse(testInput);

export function solve(input) {
    return input.split("").reduce((a, c) => c === "(" ? a+1 : a-1, 0);
}
export const solution = undefined;