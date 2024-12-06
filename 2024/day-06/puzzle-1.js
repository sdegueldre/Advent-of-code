import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid, enumGrid, inGrid, pairSum, rotateRight, logGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 41]];

export function solve(input) {
    const grid = toGrid(input);
    let pos;
    for (const {x, y, cell} of enumGrid(grid)) {
        if (cell === "^") {
            pos = [x, y];
            break;
        }
    }
    const visited = new Set();
    let dir = [0, -1];
    while (inGrid(pos[1], pos[0], grid)) {
        visited.add(JSON.stringify(pos));
        const [nx, ny] = pairSum(pos, dir);
        if (!inGrid(ny, nx, grid)) {
            break;
        }
        if (grid[ny][nx] === "#") {
            dir = rotateRight(dir);
        } else {
            pos = [nx, ny];
        }
    }
    return visited.size;
}
export const solution = 4696;
