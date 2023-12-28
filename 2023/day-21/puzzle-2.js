import { enumGrid, pairSum, directNeighbors, mod } from "../../utils.js";

export const testCases = [];

export function solve(input, steps) {
    steps ||= 26501365;
    const grid = input.split("\n").map((l) => [...l]);
    const w = grid[0].length;
    const h = grid.length;
    let queue = [];
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === "S") {
            grid[y][x] = ".";
            queue.push([x, y]);
        }
    }

    const seen = new Set();
    const points = [];
    for (let i = 0; i <= steps; i++) {
        for (const [x, y] of queue.splice(0)) {
            const key = JSON.stringify([x, y]);
            if (seen.has(key)) continue;
            seen.add(key);

            for (const [nx, ny] of directNeighbors.map(pairSum([x, y]))) {
                if (grid[mod(ny, h)][mod(nx, w)] === ".") {
                    queue.push([nx, ny]);
                }
            }
        }
        if (i % 131 === 65) {
            points.push(
                [...seen].map((p) => JSON.parse(p)).filter(([x, y]) => mod(x + y, 2) === i % 2)
                    .length
            );
            if (points.length === 3) {
                break;
            }
        }
    }

    const [p1, p2, p3] = points;
    // ax² + bx + c = y
    const c = p1;
    // 4a + 2b + c = p3 => 4(p2 - c - b) + 2b + c = p3 => -2b = p3 - 4p2 + 3c => b = (4p2 - p3 - 3c)/2
    const b = (4 * p2 - p3 - 3 * c) / 2;
    // a + b + c = p2 <=> a = p2 - c - b
    const a = p2 - c - b;
    const x = (steps - 65) / 131;
    return a * x ** 2 + b * x + c;
}
export const solution = 622926941971282;
