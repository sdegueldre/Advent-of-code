import { readFileSync } from "fs";
import { product, logThrough, enumerate, toGrid, enumGrid, diagNeighbors, pairSum, inGrid, directNeighbors } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 81]];

const explore = (x, y, grid) => {
    let queue = [[x, y]];
    let score = 0;
    while (queue.length) {
        const toVisit = queue.splice(0);
        for (const [x, y] of toVisit) {
            if (grid[y][x] === 9) {
                score++;
                continue;
            }
            for (const [nx, ny] of directNeighbors.map(n => pairSum(n, [x, y]))) {
                if (inGrid(ny, nx, grid) && grid[ny][nx] === grid[y][x] + 1) {
                    queue.push([nx, ny]);
                }
            }
        }
    }
    return score;
}

export function solve(input) {
    const grid = toGrid(input, (n) => +n);
    let score = 0;
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === 0) {
            score += explore(x, y, grid);
        }
    }
    return score;
}
export const solution = 969;
