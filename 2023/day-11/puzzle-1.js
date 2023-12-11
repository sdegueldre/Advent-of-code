import { readFileSync } from "fs";
import { enumerate, range, enumGrid, manhattan } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 374]];

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    const emptyRows = new Set(range(0, grid.length - 1));
    const emptyCols = new Set(range(0, grid.length - 1));
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell !== ".") {
            emptyRows.delete(y);
            emptyCols.delete(x);
        }
    }
    for (const row of grid) {
        let offset = 0;
        for (const col of emptyCols) {
            row.splice(col + offset++, 0, ".");
        }
    }
    let offset = 0;
    for (const col of emptyRows) {
        grid.splice(col + offset++, 0, [...".".repeat(grid[0].length)]);
    }

    const galaxies = [];
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === "#") {
            galaxies.push([x, y]);
        }
    }
    let totalDist = 0;
    for (const [i, a] of enumerate(galaxies)) {
        for (const b of galaxies.slice(i + 1)) {
            totalDist += manhattan(a, b);
        }
    }
    return totalDist;
}

export const solution = 9918828;
