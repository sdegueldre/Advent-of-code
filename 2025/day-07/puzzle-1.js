import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 21]];

export function solve(input) {
    const grid = toGrid(input);
    let beams = [grid[0].indexOf("S")];
    let splits = 0;
    for (const row of grid.slice(1)) {
        beams = new Set([...beams].flatMap(b => row[b] === "^" ? (splits++, [b - 1, b + 1]) : [b]));
    }
    return splits;
}
export const solution = 1646;
