import { readFileSync } from "fs";
import { sum, enumerate, neighbors, pairSum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 467835]];

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    const seen = new Set();
    const nums = [];
    for (const [i, line] of enumerate(grid)) {
        for (const [j, cell] of enumerate(line)) {
            if (cell === "*") {
                const adjNumbers = [];
                const tempSeen = new Set();
                for (let [y, x] of neighbors.map(pairSum([i, j]))) {
                    if (
                        !grid[y][x].match(/\d/) ||
                        seen.has([x, y].join()) ||
                        tempSeen.has([x, y].join())
                    )
                        continue;
                    let left = x;
                    let right = x;
                    while ((grid[y][left - 1] || "").match(/\d/)) left--;
                    while ((grid[y][right + 1] || "").match(/\d/)) right++;
                    adjNumbers.push(+grid[y].slice(left, right + 1).join(""));
                    for (let i = left; i <= right; i++) tempSeen.add([i, y].join());
                }
                if (adjNumbers.length === 2) {
                    nums.push(adjNumbers[0] * adjNumbers[1]);
                    for (const n of tempSeen) {
                        seen.add(n);
                    }
                }
            }
        }
    }
    return sum(nums);
}
export const solution = 81463996;
