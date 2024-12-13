import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid, enumGrid, perimeter, directNeighbors, pairSum, inGrid, shallowEqual } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1930]];

const floodFill = (x, y, grid) => {
    const cell = grid[y][x];
    const stack = [[x, y]];
    const seen = new Set();
    while (stack.length) {
        const [x, y] = stack.pop();
        const key = JSON.stringify([x, y]);
        if (seen.has(key)) continue;
        seen.add(key);
        for (const [nx, ny] of directNeighbors.map(n => pairSum(n, [x, y]))) {
            if(inGrid(ny, nx, grid) && grid[ny][nx] === cell) {
                stack.push([nx, ny]);
            }
        }
    }
    return [...seen].map(p => JSON.parse(p));
}
const interest = [7,4];
const logIf = (x, y, ...args) => {
    if (shallowEqual([x, y], interest)) {
        console.log(...args);
    }
}
export function solve(input) {
    const grid = toGrid(input);
    const plots = [];
    const seen = new Set();
    for (const {x, y, cell} of enumGrid(grid)) {
        const key = JSON.stringify([x, y]);
        if (seen.has(key)) continue;
        const plot = floodFill(x, y, grid);
        let perimeter = 0;
        for (const [x, y] of plot) {
            seen.add(JSON.stringify([x, y]));
            for (const [nx, ny] of directNeighbors.map(n => pairSum(n, [x, y]))) {
                if(!inGrid(ny, nx, grid) || grid[ny][nx] !== cell) {
                    perimeter++;
                }
            }
        }
        plots.push({area: plot.length, perimeter, cell});
    }
    return sum(plots.map(({area, perimeter}) => area * perimeter))
}
export const solution = 1573474;
