import { readFileSync } from "fs";
import {
    zip,
    enumerate,
    enumGrid,
    pairSum,
    pairDiff,
    shallowEqual,
    directNeighbors,
} from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = zip(testInput.split("\n\n"), [8, 10]);

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
        if (!(y in grid) || !(x in grid[y])) continue;
        const el = grid[y][x];
        if (el in connections) {
            const connection = pairDiff(start, [x, y]);
            if (connections[el].find((pos) => shallowEqual(pos, connection))) {
                queue.push([x, y]);
            }
        }
    }
    for (const [k, conns] of Object.entries(connections)) {
        if (
            queue
                .map((qi) => pairDiff(qi, start))
                .every((delta) => conns.find((c) => shallowEqual(c, delta)))
        ) {
            grid[start[1]][start[0]] = k;
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
    let enclosed = 0;
    const inside = new Set();
    for (const { x, y } of enumGrid(grid)) {
        if (seen.has([x, y].join(","))) {
            continue;
        }
        let lefts = [...enumerate(grid[y].slice(0, x))]
            .filter(
                ([lx, left]) =>
                    seen.has([lx, y].join(",")) && ["7", "J", "F", "L", "|"].includes(left)
            )
            .map((p) => p[1])
            .join("");
        lefts = lefts.replaceAll("FJ", "|");
        lefts = lefts.replaceAll("F7", "");
        lefts = lefts.replaceAll("L7", "|");
        lefts = lefts.replaceAll("LJ", "");
        if (lefts.length % 2) {
            inside.add([x, y].join(","));
            enclosed += 1;
        }
    }
    // for (const [y, row] of enumerate(grid)) {
    //     for (const [x, val] of enumerate(row)) {
    //         if (seen.has([x, y].join(","))) {
    //             process.stdout.write(`\x1b[36m${val}\x1b[0m`);
    //         } else if (inside.has([x, y].join(","))) {
    //             process.stdout.write(`\x1b[35m${val}\x1b[0m`);
    //         } else {
    //             process.stdout.write(val);
    //         }
    //     }
    //     console.log("");
    // }
    return enclosed;
}
export const solution = 455;
