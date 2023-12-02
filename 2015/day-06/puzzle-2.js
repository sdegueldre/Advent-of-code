import { readFileSync } from "fs";
import { sum, extractLines } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1_000_000 + 2000 - 4]];

export function solve(input) {
    const lights = Array(1000)
        .fill(0)
        .map(() => Array(1000).fill(0));
    const instructions = extractLines(
        input,
        /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    );
    for (const [instruction, sx, sy, ex, ey] of instructions) {
        for (let i = +sx; i <= ex; i++) {
            for (let j = +sy; j <= ey; j++) {
                lights[i][j] += instruction === "toggle" ? 2 : instruction === "turn on" ? 1 : -1;
                if (lights[i][j] < 0) {
                    lights[i][j] = 0;
                }
            }
        }
    }
    return sum(lights.map(sum));
}
export const solution = 14110788;
