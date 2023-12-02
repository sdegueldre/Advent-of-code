import { readFileSync } from "fs";
import { product } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 2286]];

export function solve(input) {
    const lines = input.split("\n").map((l) => l.split(": ")[1].match(/(\d+) (red|green|blue)/g));
    let powerSum = 0;
    for (const line of lines) {
        const mins = {
            red: 0,
            green: 0,
            blue: 0,
        };
        for (const item of line) {
            const [n, col] = item.split(" ");
            mins[col] = Math.max(mins[col], +n);
        }
        powerSum += product(Object.values(mins));
    }
    return powerSum;
}
export const solution = 59795;
