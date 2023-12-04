import { readFileSync } from "fs";
import { sum, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 30]];

export function solve(input) {
    const lines = input.split("\n").map((l) =>
        l
            .match(/Card +\d+: (.*)/)[1]
            .split(" | ")
            .map((p) => p.trim().split(/\s+/))
    );
    const points = lines.map(([winning, nums]) => nums.filter((n) => winning.includes(n)).length);
    let cards = Array(points.length).fill(1);
    for (const [i, point] of enumerate(points)) {
        for (let j = 0; j < point; j++) {
            cards[j + i + 1] += cards[i];
        }
    }
    return sum(cards);
}
export const solution = 23806951;
