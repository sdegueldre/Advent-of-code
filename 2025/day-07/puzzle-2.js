import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 40]];

export function solve(input) {
    const grid = toGrid(input);
    let beams = {[grid[0].indexOf("S")]: 1};
    for (const row of grid.slice(1)) {
        const newBeams = {};
        for (let [pos, nBeams] of Object.entries(beams)) {
            pos = +pos;
            if (row[pos] === "^") {
                newBeams[pos + 1] = (newBeams[pos + 1] || 0) + nBeams;
                newBeams[pos - 1] = (newBeams[pos - 1] || 0) + nBeams;
            } else {
                newBeams[pos]  =(newBeams[pos] || 0) + nBeams;
            }
        }
        beams = newBeams;
    }
    return sum(Object.values(beams));
}
export const solution = 32451134474991;
