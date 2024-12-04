import { readFileSync } from "fs";
import { enumGrid, inGrid, neighbors } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 18]];

function countXmas(x, y, grid) {
    let count = 0;
    outer: for (const [sx, sy] of neighbors) {
        for (const [char, dx, dy] of [..."XMAS"].map((c, i) => [c, sx * i, sy * i])) {
            if (!inGrid(y + dy, x + dx, grid) || grid[y + dy][x + dx] !== char) {
                continue outer;
            }
        }
        count++;
    }
    return count;
}

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    let xmasCount = 0;
    for (const { x, y, row, cell } of enumGrid(grid)) {
        xmasCount += countXmas(x, y, grid);
    }
    return xmasCount;
}
export const solution = 2390;
