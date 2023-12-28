import { readFileSync } from "fs";
import { directNeighbors, pairSum, enumGrid, queue } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 154]];

const findAdjacent = (grid, [x, y], targets) => {
    const q = queue([[x, y, 0]]);
    const seen = new Set();
    const paths = [];
    for (const [x, y, dist] of q) {
        const key = JSON.stringify([x, y]);
        if (seen.has(key)) continue;
        if (dist && key in targets) {
            paths.push([key, dist]);
            continue;
        }
        seen.add(key);
        const adjacent = directNeighbors
            .map(pairSum([x, y]))
            .filter(([x, y]) => grid[y]?.[x] === ".");
        q.enqueue(...adjacent.map(([x, y]) => [x, y, dist + 1]));
    }
    return paths;
};

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l].map((c) => (c === "#" ? "#" : ".")));
    const startX = grid[0].indexOf(".");
    const start = JSON.stringify([startX, 0]);
    const targetX = grid.at(-1).indexOf(".");
    const target = JSON.stringify([targetX, grid.length - 1]);

    const nodes = {
        [start]: {},
        [target]: {},
    };
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell !== ".") continue;
        if (
            directNeighbors.map(pairSum([x, y])).filter(([x, y]) => grid[y]?.[x] === ".").length > 2
        ) {
            const key = JSON.stringify([x, y]);
            nodes[key] = {};
        }
    }
    for (const node in nodes) {
        const [x, y] = JSON.parse(node);
        for (const [key, dist] of findAdjacent(grid, [x, y], nodes)) {
            nodes[node][key] = dist;
        }
    }

    let longestPath = 0;
    const stack = [[start, 0, new Set()]];
    while (stack.length) {
        const [node, pathLength, visited] = stack.pop();
        if (visited.has(node)) {
            continue;
        }
        visited.add(node);
        if (node === target) {
            if (pathLength > longestPath) {
                longestPath = pathLength;
                continue;
            }
        }
        for (const [neighbor, dist] of Object.entries(nodes[node])) {
            stack.push([neighbor, pathLength + dist, new Set(visited)]);
        }
    }
    return longestPath;
}
export const solution = 6434;
