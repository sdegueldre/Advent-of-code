import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, window } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 24]];

export function solve(input) {
    const tiles = input.split("\n").map(l => l.split(",").map(n => +n));
    let maxArea = 0;
    let edges = window(tiles, 2);
    edges.push([tiles.at(-1), tiles[0]]);
    edges = edges.map(([[x1, y1], [x2, y2]]) => [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)]);
    if (edges.some(([a, b, c, d]) => c - a === 1 || d - b === 1)) throw new Error("a one tile long segment breaks this solution");
    for (const [i, [x1, y1]] of enumerate(tiles)) {
        for (const [j, [x2, y2]] of enumerate(tiles)) {
            if (j<=i) continue;
            const [l, t, r, b] = [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
            const area = ((r - l + 1) * (b - t + 1));
            if (maxArea >= area) continue;
            if (edges.some(([l2, t2, r2, b2]) => {
                // AABB intersection, ignore intersection on the edges because these don't
                // carve out empty tiles.
                // PS: technically, because edges have thickness, this could incorrectly report
                // a rectangle as invalid if it has "1" wide segment going into it. We check against this early on
                return r2 > l && b2 > t && l2 < r && t2 < b;
            })) continue;
            maxArea = area;
        }
    }
    return maxArea;
}
export const solution = 1473551379;
