import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, pairDiff, counter } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 31]];

export function solve(input) {
    const [l, r] = zip(...input.split("\n").map((l) => l.split(/\s+/).map((n) => +n))).map((a) =>
        a.sort((a, b) => a - b)
    );
    const counts = counter(r);
    return sum(l.map((el) => el * (counts[el] || 0)));
}
export const solution = 21328497;
