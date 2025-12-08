import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, dist, UnionFind } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[[testInput, 10], 25272]];

export function solve(input, requiredConnections) {
    requiredConnections ??= 1000;
    const boxes = input.split("\n").map(l => l.split(",").map(n => +n));
    const distances = [];
    for (const [i, b1] of enumerate(boxes)) {
        const [x1, y1, z1] = b1;
        for (const b2 of boxes.slice(i + 1)) {
            const [x2, y2, z2] = b2;
            const distance = ((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2) ** 0.5;
            distances.push([distance, [b1, b2]]);
        }
    }
    distances.sort(([a], [b]) => a - b);
    const circuits = new UnionFind(boxes);
    let lastConnection = null;
    for (const [distance, [a, b]] of distances) {
        if (circuits.find(a) === circuits.find(b)) continue;
        circuits.union(a, b);
        lastConnection = [a, b];
        if (circuits.size === 1) break;
    }
    return lastConnection[0][0] * lastConnection[1][0];
}
export const solution = 8141888143;
