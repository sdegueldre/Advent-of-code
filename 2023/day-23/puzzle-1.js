import { readFileSync } from "fs";
import { PriorityQueue, directNeighbors, pairSum, shallowEqual } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [
    [testInput, 94]
];

const slopes = {
    ">": [1, 0],
    "<": [-1, 0],
    "^": [0, -1],
    v: [0, 1],
};

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    const startX = grid[0].indexOf(".");
    const targetX = grid.at(-1).indexOf(".");
    const target = [targetX, grid.length - 1];

    const traversable = ([x, y], from) => {
        const char = grid[y]?.[x];
        if (char === ".") return true;
        if (char === "#" || char === undefined) return false;
        if (shallowEqual(pairSum(slopes[char], [x, y]), from)) return false;
        return true;
    };

    const paths = [];
    const q = new PriorityQueue([[startX, 0, new Set()]], (a, b) => a[2].size > b[2].size);
    for (const [x, y, visited] of q) {
        const char = grid[y]?.[x];
        visited.add(JSON.stringify([x, y]));
        if (shallowEqual([x, y], target)) {
            paths.push(visited);
            continue;
        }
        if (char in slopes) {
            const [nx, ny] = pairSum(slopes[char], [x, y]);
            q.enqueue([nx, ny, new Set(visited)]);
            continue;
        }
        for (const [nx, ny] of directNeighbors.map(pairSum([x, y]))) {
            const key = JSON.stringify([nx, ny]);
            if (!visited.has(key) && traversable([nx, ny], [x, y])) {
                q.enqueue([nx, ny, new Set(visited)]);
            }
        }
    }
    const path = paths.sort((a, b) => b.size - a.size)[0];
    return path.size - 1;
}
export const solution = 1998;
