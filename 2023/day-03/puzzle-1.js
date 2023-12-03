import { readFileSync } from "fs";
import { sum, enumerate, neighbors, pairSum, constrain, enumGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 4361]];

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    const seen = new Set();
    const nums = [];
    for (const { y: i, x: j, cell } of enumGrid(grid)) {
        if (cell.match(/(\d|\.)/)) {
            continue;
        }
        for (let [y, x] of neighbors.map(pairSum([i, j]))) {
            if (!grid[y][x].match(/\d/) || seen.has([x, y].join())) continue;
            let left = x;
            let right = x;
            while ((grid[y][left - 1] || "").match(/\d/)) left--;
            while ((grid[y][right + 1] || "").match(/\d/)) right++;
            nums.push(+grid[y].slice(left, right + 1).join(""));
            for (let i = left; i <= right; i++) seen.add([i, y].join());
        }
    }
    return sum(nums);
}
export const solution = 527144;
