import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, extractLines } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1_000_000 - 1000 - 4]];

export function solve(input) {
    const lights = Array(1000).fill(0).map(() => Array(1000).fill(false));
    const instructions = extractLines(input, /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
    for (const [instruction, sx, sy, ex, ey] of instructions) {
        for (let i = +sx; i <= ex; i++) {
            for (let j = +sy; j <= ey; j++) {
                lights[i][j] = instruction === "toggle" ? !lights[i][j] : instruction === "turn on";
            }
        }
    }
    return sum(lights.map(sum));
}
export const solution = 377891;
