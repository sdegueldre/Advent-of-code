import { readFileSync } from "fs";
import { pairSum, perimeter, area } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 952408144115]];

const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

export function solve(input) {
    const lines = input.split("\n").map((l) => {
        const n = l.split(" ")[2].slice(2, -1);
        return [+n.slice(-1), parseInt(n.slice(0, -1), 16)];
    });
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
    return area(points) + perimeter(points) / 2 + 1;
}
export const solution = 44644464596918;
