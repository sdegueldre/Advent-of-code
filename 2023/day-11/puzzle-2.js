import { readFileSync } from "fs";
import { enumerate, range, enumGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 82000210]];

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

    const galaxies = [];
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === "#") {
            galaxies.push([x, y]);
        }
    }
    let totalDist = 0;
    for (const [i, [x1, y1]] of enumerate(galaxies)) {
        for (const [x2, y2] of galaxies.slice(i + 1)) {
            const [minX, maxX] = [x1, x2].sort((a, b) => a - b);
            let xDist = maxX - minX;
            for (const col of emptyCols) {
                if (col <= maxX && col >= minX) xDist += 999999;
            }

            const [minY, maxY] = [y1, y2].sort((a, b) => a - b);
            let yDist = maxY - minY;
            for (const row of emptyRows) {
                if (row <= maxY && row >= minY) yDist += 999999;
            }
            totalDist += xDist + yDist;
        }
    }
    return totalDist;
}

export const solution = 692506533832;
