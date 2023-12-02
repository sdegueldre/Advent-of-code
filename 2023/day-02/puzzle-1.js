import { readFileSync } from "fs";
import { enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 8]];

export function solve(input) {
    const lines = input.split("\n").map((l) => l.split(": ")[1].match(/(\d+) (red|green|blue)/g));
    let possibleGamesIdSum = 0;
    for (const [i, line] of enumerate(lines)) {
        const available = {
            red: 12,
            green: 13,
            blue: 14,
        };
        const possible = line.every((item) => {
            const [n, col] = item.split(" ");
            return available[col] >= n;
        });
        if (possible) {
            possibleGamesIdSum += i + 1;
        }
    }
    return possibleGamesIdSum;
}
export const solution = 2617;
