import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, enumGrid, neighbors, pairSum, inGrid, toGrid, logGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 43]];

export function solve(input) {
    const grid = toGrid(input);
    let removable = 0;
    let goAgain = true;
    while (goAgain) {
        goAgain = false;
        for (const { x, y, cell } of enumGrid(grid)) {
            if (cell !== "@") continue;
            const neighboringRolls = sum(neighbors.map(pairSum([x, y])).map(([nx, ny]) => {
                if (!inGrid(ny, nx, grid)) return 0;
                return grid[ny][nx] === "@";
            }));
            if (neighboringRolls < 4) {
                grid[y][x] = ".";
                removable++;
                goAgain = true;
            }
        }
    }
    logGrid(grid);
    return removable;
}
export const solution = 8587;
