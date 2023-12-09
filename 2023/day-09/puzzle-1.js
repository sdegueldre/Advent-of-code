import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, window, pairDiff } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 114]];

export function solve(input) {
    const lines = input.split("\n").map(l => l.split(" ").map(n => +n));
    let total = 0;
    for (let line of lines) {
        const lasts = [];
        while (!line.every(el => el === 0)) {
            lasts.push(line.at(-1));
            line = window(line, 2).map(([a, b]) => b - a);
        }
        total += sum(lasts)
    }
    return total;
}
export const solution = 1798691765;
