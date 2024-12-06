import { readFileSync } from "fs";
import { sum, toGrid, enumGrid, inGrid, pairSum, rotateRight, logGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 6]];

const getPath = (pos, grid) => {
    const visited = new Set();
    let dir = [0, -1];
    while (inGrid(pos[1], pos[0], grid)) {
        const key = JSON.stringify([pos, dir]);
        if (visited.has(key)) {
            return { loops: true, visited };
        }
        visited.add(key);
        const [nx, ny] = pairSum(pos, dir);
        if (!inGrid(ny, nx, grid)) {
            return { loops: false, visited };
        }
        if (grid[ny][nx] === "#") {
            dir = rotateRight(dir);
        } else {
            pos = [nx, ny];
        }
    }
};

export function solve(input) {
    const grid = toGrid(input);
    let startPos;
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === "^") {
            startPos = [x, y];
            break;
        }
    }
    const { visited } = getPath(startPos, grid);
    const causesLoop = ([x, y]) => {
        if (grid[y][x] !== ".") return false;
        grid[y][x] = "#";
        const { loops } = getPath(startPos, grid);
        grid[y][x] = ".";
        return loops;
    };
    const toVisit = [...new Set([...visited].map((str) => JSON.stringify(JSON.parse(str)[0])))].map(s => JSON.parse(s));
    return sum(toVisit.map(causesLoop));
}
export const solution = 1443;
