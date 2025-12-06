import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 4277556]];

export function solve(input) {
    const lines = zip(...input.split("\n").map(l => l.trim().split(/\s+/)));
    return sum(lines.map(l => {
        const reducer = l.pop() === "*" ? (a, v) => a * v : (a, v) => a + v;
        return l.map(n => +n).reduce(reducer);
    }))
};
export const solution = 3261038365331;
