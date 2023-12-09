import { readFileSync } from "fs";
import { window } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 2]];

export function solve(input) {
    const lines = input.split("\n").map((l) => l.split(" ").map((n) => +n));
    let total = 0;
    for (let line of lines) {
        const firsts = [];
        while (!line.every((el) => el === 0)) {
            firsts.push(line[0]);
            line = window(line, 2).map(([a, b]) => b - a);
        }
        total += firsts.reverse().reduce((a, v) => v - a, 0);
    }
    return total;
}
export const solution = 1104;
