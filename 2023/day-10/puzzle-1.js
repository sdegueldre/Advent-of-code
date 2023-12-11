import { readFileSync } from "fs";
import {
    enumerate,
    enumGrid,
    pairSum,
    pairDiff,
    shallowEqual,
    directNeighbors,
} from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 8]];

// x increases to the right, y increases to the bottom
const connections = {
    "|": [
        [0, 1],
        [0, -1],
    ],
    "-": [
        [1, 0],
        [-1, 0],
    ],
    L: [
        [0, -1],
        [1, 0],
    ],
    J: [
        [0, -1],
        [-1, 0],
    ],
    7: [
        [0, 1],
        [-1, 0],
    ],
    F: [
        [0, 1],
        [1, 0],
    ],
};

export function solve(input) {
    const grid = input.split("\n").map((l) => [...l]);
    let start;
    for (const { x, y, cell } of enumGrid(grid)) {
        if (cell === "S") {
            start = [x, y];
        }
    }
    const seen = new Set([start.join(",")]);
    let queue = [];
    for (const [x, y] of directNeighbors.map((n) => pairSum(n, start))) {
        const el = grid[y][x];
        if (el in connections) {
            const connection = pairDiff(start, [x, y]);
            if (connections[el].find((pos) => shallowEqual(pos, connection))) {
                queue.push([x, y]);
            }
        }
    }
    while (queue.length) {
        queue = queue
            .map(([x, y]) => {
                seen.add([x, y].join(","));
                const pipe = grid[y][x];
                return connections[pipe]
                    .map((c) => pairSum(c, [x, y]))
                    .find((p) => !seen.has(p.join(",")));
            })
            .filter(Boolean);
    }
    // for (const [y, row] of enumerate(grid)) {
    //     for (const [x, val] of enumerate(row)) {
    //         if (seen.has([x, y].join(","))) {
    //             process.stdout.write(`\x1b[36m${val}\x1b[0m`);
    //         } else {
    //             process.stdout.write(val);
    //         }
    //     }
    //     console.log("");
    // }
    return seen.size / 2;
}
export const solution = 6956;
