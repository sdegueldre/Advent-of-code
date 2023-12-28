import { readFileSync } from "fs";
import { enumGrid, pairSum, directNeighbors } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[[testInput, 6], 16]];

export function solve(input, steps) {
    steps ||= 64;
    const grid = input.split("\n").map((l) => [...l]);
    let queue = [];
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === "S") {
            grid[y][x] = ".";
            queue.push([x, y]);
        }
    }

    for (let i = 0; i < steps; i++) {
        const seen = new Set();
        for (const [x, y] of queue.splice(0)) {
            for (const [nx, ny] of directNeighbors.map(pairSum([x, y]))) {
                const key = [nx, ny].join(",");
                if (grid[ny]?.[nx] === "." && !seen.has(key)) {
                    queue.push([nx, ny]);
                    seen.add(key);
                }
            }
        }
    }
    return new Set(queue.map(([x, y]) => [x, y].join(","))).size;
}
export const solution = 3764;
