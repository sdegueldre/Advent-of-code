import { readFileSync } from "fs";
import { pairSum, area, perimeter } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 62]];

const dirs = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, -1],
    D: [0, 1],
};

export function solve(input) {
    const lines = input.split("\n").map((l) => l.split(" ").slice(0, 2));
    const points = [[0, 0]];
    let pos = [0, 0];
    for (const [dir, n] of lines) {
        const v = dirs[dir];
        pos = pairSum(pos, [n * v[0], n * v[1]]);
        points.push(pos);
    }
    // Perimeter * 0.5 because we computed area with vertices in center of cells
    // expand by 0.5 on each side => perimeter * 0.5
    // +1 because there will always be 4 more external corners if the shape is closed
    // and not self-overlapping, each corner is 0.5 * 0.5
    // if self-overlapping it would be 1 * number of turns
    return area(points) + perimeter(points) * 0.5 + 1;
}
export const solution = 39039;
