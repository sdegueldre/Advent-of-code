import { readFileSync } from "fs";
import { enumerate, intersectRanges } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[[testInput, [7, 27]], 2]];

export function solve(input, testArea) {
    testArea ||= [200000000000000, 400000000000000];
    const lines = input
        .split("\n")
        .map((l) => l.split(" @ ").map((p) => p.split(", ").map((n) => +n)));
    let intersections = 0;
    for (const [i, [[x1, y1], [dx1, dy1]]] of enumerate(lines)) {
        for (const [[x2, y2], [dx2, dy2]] of lines.slice(i + 1)) {
            const a1 = dy1 / dx1;
            const b1 = y1 - a1 * x1;
            const a2 = dy2 / dx2;
            const b2 = y2 - a2 * x2;

            const x = (b2 - b1) / (a1 - a2);
            const y = a1 * x + b1;

            const intersection = [x, y];
            if (
                intersectRanges([intersection[0], intersection[0]], testArea) &&
                intersectRanges([intersection[1], intersection[1]], testArea) &&
                Math.sign(x - x1) === Math.sign(dx1) &&
                Math.sign(x - x2) === Math.sign(dx2)
            ) {
                intersections++;
            }
        }
    }
    return intersections;
}
export const solution = 13892;
