import { readFileSync } from "fs";
import { queue, pairSum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 51]];

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    const energy = (start) => {
        const q = queue([start]);
        const seen = new Set();
        for (let { pos, dir } of q) {
            const key = JSON.stringify([pos, dir]);
            if (seen.has(key)) continue;
            seen.add(key);
            const [x, y] = pairSum(pos, dir);
            if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) continue;
            const el = grid[y][x];
            if (el === "/") {
                q.enqueue({ dir: [-dir[1], -dir[0]], pos: [x, y] });
            } else if (el === "\\") {
                q.enqueue({ dir: [dir[1], dir[0]], pos: [x, y] });
            } else if (el === "|" && dir[0]) {
                q.enqueue({ dir: [0, 1], pos: [x, y] }, { dir: [0, -1], pos: [x, y] });
            } else if (el === "-" && dir[1]) {
                q.enqueue({ dir: [1, 0], pos: [x, y] }, { dir: [-1, 0], pos: [x, y] });
            } else {
                q.enqueue({ dir, pos: [x, y] });
            }
        }
        return new Set([...seen].map((s) => JSON.stringify(JSON.parse(s)[0]))).size - 1;
    };

    const starts = [];
    for (let i = 0; i < grid.length; i++) {
        starts.push({ pos: [-1, i], dir: [1, 0] }, { pos: [grid.length, i], dir: [-1, 0] });
    }
    for (let i = 0; i < grid[0].length; i++) {
        starts.push({ pos: [i, -1], dir: [0, 1] }, { pos: [i, grid[0].length], dir: [0, -1] });
    }
    return Math.max(...starts.map(energy));
}
export const solution = 7315;
