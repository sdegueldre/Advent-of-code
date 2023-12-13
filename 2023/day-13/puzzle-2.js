import { readFileSync } from "fs";
import { sum, deepEqual, enumGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 400]];

const findReflection = (grid) => {
    let oldLine = [0, 0];
    for (let i = 1; i < grid.length; i++) {
        const len = Math.min(i, grid.length - i);
        if (deepEqual(grid.slice(i - len, i), grid.slice(i, i + len).reverse())) {
            oldLine[0] = i;
            break;
        }
    }
    for (let i = 1; i < grid[0].length; i++) {
        const len = Math.min(i, grid[0].length - i);
        if (
            deepEqual(
                grid.map((r) => r.slice(i - len, i)),
                grid.map((r) => r.slice(i, i + len).reverse())
            )
        ) {
            oldLine[1] = i;
            break;
        }
    }
    for (const { y, x, cell } of enumGrid(grid)) {
        grid[y][x] = cell === "#" ? "." : "#";
        for (let i = 1; i < grid.length; i++) {
            if (i === oldLine[0]) continue;
            const len = Math.min(i, grid.length - i);
            if (deepEqual(grid.slice(i - len, i), grid.slice(i, i + len).reverse())) {
                return i * 100;
            }
        }
        for (let i = 1; i < grid[0].length; i++) {
            if (i === oldLine[1]) continue;
            const len = Math.min(i, grid[0].length - i);
            if (
                deepEqual(
                    grid.map((r) => r.slice(i - len, i)),
                    grid.map((r) => r.slice(i, i + len).reverse())
                )
            ) {
                return i;
            }
        }
        grid[y][x] = cell;
    }
    throw new Error("No reflection");
};

export function solve(input) {
    const patterns = input.split("\n\n").map((g) => g.split("\n").map((l) => l.split("")));
    return sum(patterns.map(findReflection));
}
export const solution = 33991;
