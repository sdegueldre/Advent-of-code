import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 50]];

export function solve(input) {
    const tiles = input.split("\n").map(l => l.split(",").map(n => +n));
    let maxArea = 0;
    for (const [i, [x1, y1]] of enumerate(tiles)) {
        for (const [j, [x2, y2]] of enumerate(tiles)) {
            if (j<=i) continue;
            const area = Math.abs((x1 - x2 + 1) * (y1 - y2 + 1));
            maxArea = area > maxArea ? area : maxArea;
        }
    }
    return maxArea;
}
export const solution = 4777409595;
