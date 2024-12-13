import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid, enumGrid, perimeter, directNeighbors, pairSum, inGrid, shallowEqual, pairDiff } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1206]];

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

export function solve(input) {
    const grid = toGrid(input);
    const plots = [];
    const seen = new Set();
    for (const {x, y, cell} of enumGrid(grid)) {
        const key = JSON.stringify([x, y]);
        if (seen.has(key)) continue;
        const plot = floodFill(x, y, grid);
        const allSides = new Set();
        for (const [x, y] of plot) {
            const key = JSON.stringify([x, y]); 
            seen.add(key);
            for (const dir of directNeighbors) {
                const [nx, ny] = pairSum(dir, [x, y])
                if(!inGrid(ny, nx, grid) || grid[ny][nx] !== cell) {
                    allSides.add(JSON.stringify([[x, y], dir]));
                }
            }
        }
        const seenSides = new Set();
        let nbSides = 0;
        for (const [pos, normal] of [...allSides].map(s => JSON.parse(s))) {
            const key = JSON.stringify([pos, normal]);
            if (seenSides.has(key)) continue;
            nbSides++;
            const dir1 = normal.toReversed();
            const dir2 = pairDiff([0, 0], dir1);
            let current = pos;
            while (true) {
                const currentKey = JSON.stringify([current, normal]);
                if (!allSides.has(currentKey) || seenSides.has(currentKey)) break;
                seenSides.add(currentKey);
                current = pairSum(dir1, current);
            }
            current = pos;
            while (true) {
                const currentKey = JSON.stringify([current, normal]);
                if (current !== pos && (!allSides.has(currentKey) || seenSides.has(currentKey))) break;
                seenSides.add(currentKey);
                current = pairSum(dir2, current);
            }
        }
        plots.push({area: plot.length, nbSides, cell});
    }
    return sum(plots.map(({area, nbSides}) => area * nbSides))
}
export const solution = 966476;
