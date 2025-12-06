import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 3263827]];

export function solve(input) {
    const lines = input.split("\n");
    const ops = lines.pop().trim().split(/\s+/);
    const numbers = zip(...lines).map(l => l.join("")).join("\n").split(/^ +$/m).map(p => p.trim().split(/[\n ]+/).map(n => +n));
    return sum(zip(numbers, ops).map(([l, op]) => {
        const reducer = op === "*" ? (a, v) => a * v : (a, v) => a + v;
        return l.map(n => +n).reduce(reducer);
    }))
};
export const solution = 8342588849093;
