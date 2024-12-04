import { readFileSync } from "fs";
import { enumGrid, inGrid, neighbors } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 9]];

function isXmas(x, y, grid) {
    if (x < 1 || x >= grid[0].length - 1 || y < 1 || y >= grid.length - 1 || grid[y][x] !== "A") {
        return 0;
    }
    return [grid[y - 1][x - 1], grid[y + 1][x + 1]].sort().join("") === "MS" && [grid[y - 1][x + 1], grid[y + 1][x - 1]].sort().join("") === "MS";
}

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    let xmasCount = 0;
    for (const { x, y, row, cell } of enumGrid(grid)) {
        xmasCount += isXmas(x, y, grid);
    }
    return xmasCount;
}
export const solution = 1809;
