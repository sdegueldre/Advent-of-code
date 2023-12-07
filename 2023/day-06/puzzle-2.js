import { readFileSync } from "fs";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 71503]];

export function solve(input) {
    const [t, d] = input.split("\n").map((l) => +l.split(/:\s+/)[1].split(/\s+/).join(""));
    // v = time spent accelerating
    // d = v(t-v);
    // v² -tv + d = 0
    // r = t² -4d
    // v = (t +- sqrt(t² - 4d))/2
    const min = Math.floor((t - Math.sqrt(t * t - 4 * d)) * 0.5 + 1);
    const max = Math.ceil((t + Math.sqrt(t * t - 4 * d)) * 0.5 - 1);
    return max - min + 1;
}
export const solution = 24655068;
