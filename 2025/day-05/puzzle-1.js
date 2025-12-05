import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 3]];

export function solve(input) {
    let [ranges, ingredients] = input.split("\n\n");
    ranges = ranges.split("\n").map(l => l.split("-").map(n => +n));
    ingredients = ingredients.split("\n").map(n => +n);
    return sum(ingredients.map(i => ranges.some(([l, r]) => i >= l && i <= r)));
}
export const solution = 694;
