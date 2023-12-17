import { readFileSync } from "fs";
import { zip, shallowEqual, pairSum, PriorityQueue } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = zip(testInput.split("\n\n"), [94, 71]);

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    const end = [grid[0].length - 1, grid.length - 1];

    const seen = new Map();
    const q = new PriorityQueue(
        [
            { pos: [0, 0], dir: [1, 0], streak: 0, heat: 0 },
            { pos: [0, 0], dir: [0, 1], streak: 0, heat: 0 },
        ],
        (a, b) => a.heat < b.heat
    );
    for (const { pos, dir, streak, heat } of q) {
        const key = JSON.stringify([dir, streak, pos]);
        if (seen.get(key) <= heat) {
            continue;
        }
        seen.set(key, heat);
        if (shallowEqual(pos, end) && streak >= 4) {
            return heat;
        }
        const possibleDirs = [];
        if (streak < 10) {
            possibleDirs.push({ streak: streak + 1, dir });
        }
        if (streak >= 4) {
            possibleDirs.push(
                { streak: 1, dir: [dir[1], -dir[0]] },
                { streak: 1, dir: [-dir[1], dir[0]] }
            );
        }
        for (const {dir, streak} of possibleDirs) {
            const [x, y] = pairSum(dir, pos);
            if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
                continue;
            }
            q.enqueue({ pos: [x, y], dir, streak, heat: heat + +grid[y][x] });
        }
    }
    throw new Error("Not found");
}

export const solution = 1210;
