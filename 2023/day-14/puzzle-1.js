import { readFileSync } from "fs";
import { zip, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 136]];

export function solve(input) {
    const lines = zip(...input.split("\n").map(l => l.split("")));
    let total = 0;
    for (const line of lines) {
        let lastRock = 0;
        for (const [i, char] of enumerate(line)) {
            if (char === "#") {
                lastRock = i + 1;
            } else if (char === "O") {
                total += line.length - lastRock;
                lastRock++;
            }
        }
    }
    return total;
}
export const solution = 108792;
