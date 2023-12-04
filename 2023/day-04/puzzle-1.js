import { readFileSync } from "fs";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 13]];

export function solve(input) {
    const lines = input.split("\n").map((l) =>
        l
            .match(/Card +\d+: (.*)/)[1]
            .split(" | ")
            .map((p) => p.trim().split(/\s+/))
    );
    let total = 0;
    for (const [winning, nums] of lines) {
        const ws = new Set(winning);
        const points = nums.filter((n) => ws.has(n));
        total += Math.floor(2 ** (points.length - 1));
    }
    return total;
}
export const solution = 20407;
