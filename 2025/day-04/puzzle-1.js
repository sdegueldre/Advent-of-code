import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, enumGrid, neighbors, pairSum, inGrid, toGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 13]];

export function solve(input) {
    const grid = toGrid(input);
    let accessible = 0;
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell !== "@") continue;
        const neighboringRolls = sum(neighbors.map(pairSum([x, y])).map(([nx, ny]) => {
            if (!inGrid(ny, nx, grid)) return 0;
            return grid[ny][nx] === "@";
        }));
        accessible += neighboringRolls < 4;
    }
    return accessible;
}
export const solution = 1376;
