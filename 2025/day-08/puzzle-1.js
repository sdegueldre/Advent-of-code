import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, dist } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[[testInput, 10], 40]];

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
    const circuits = new Map(boxes.map(b => [b, new Set([b])]));
    for (const [distance, [a, b]] of distances.slice(0, requiredConnections)) {
        if ([...circuits.values()].some(c => c.has(a) && c.has(b))) continue;
        const newCircuit = circuits.get(a).union(circuits.get(b));
        for (const box of newCircuit) {
            circuits.set(box, newCircuit);
        }
    }
    const sortedCircuits = [...new Set(circuits.values())].sort((a, b) => b.size - a.size);
    return product(sortedCircuits.slice(0, 3).map(c => c.size));
}
export const solution = 46398;
