import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, getNums } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 48]];

export function solve(input) {
    input = input.split("\n").join("");
    input = input.replace(/don't\(\).*?(do\(\)|$)/g,'');
    return sum(input.match(/mul\(\d+,\d+\)/g).map(getNums).map(([a, b]) => a * b))
}
export const solution = 92626942;
