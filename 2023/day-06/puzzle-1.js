import { readFileSync } from "fs";
import { zip, product } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 288]];

export function solve(input) {
    const [times, distances] = input.split("\n").map((l) =>
        l
            .split(/:\s+/)[1]
            .split(/\s+/)
            .map((n) => +n)
    );

    return product(
        zip(times, distances).map(([t, d]) => {
            // v = time spent accelerating
            // d = v(t-v);
            // v² -tv + d = 0
            // r = t² -4d
            // v = (t +- sqrt(t² - 4d))/2
            const min = Math.floor((t - Math.sqrt(t * t - 4 * d)) * 0.5 + 1);
            const max = Math.ceil((t + Math.sqrt(t * t - 4 * d)) * 0.5 - 1);
            return max - min + 1;
        })
    );
}
export const solution = 3317888;
