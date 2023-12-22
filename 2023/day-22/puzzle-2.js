import { readFileSync } from "fs";
import { sum, zip, enumerate, pairSum, intersectRanges, queue } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 7]];

const minZ = (b) => Math.min(b[0][2], b[1][2]);
const maxZ = (b) => Math.max(b[0][2], b[1][2]);
const overlap = (b1, b2) =>
    zip(
        zip(...b1).sort((a, b) => a - b),
        zip(...b2).sort((a, b) => a - b)
    ).every(([r1, r2]) => intersectRanges(r1, r2));

export function solve(input) {
    const bricks = input
        .split("\n")
        .map((l) => {
            const b = l.split("~").map((c) => c.split(",").map((n) => +n));
            b.supports = [];
            b.supportedBy = [];
            return b;
        })
        .sort((b1, b2) => minZ(b1) - minZ(b2));
    for (const [bidx, brick] of enumerate(bricks)) {
        const z = minZ(brick);
        for (let i = z; i > 1; i--) {
            const newBrick = brick.map((be) => pairSum(be, [0, 0, -1]));
            const firstPotentialSupport = bricks.findIndex(
                (other) => maxZ(other) >= minZ(newBrick)
            );
            const supports = bricks
                .slice(firstPotentialSupport, bidx)
                .filter((other) => overlap(newBrick, other));
            if (supports.length) {
                supports.forEach((s) => {
                    s.supports.push(bidx);
                });
                brick.supportedBy = supports.map((s) => bricks.indexOf(s));
                break;
            }
            brick[0][2]--;
            brick[1][2]--;
        }
    }
    return sum(bricks.map((b, bidx) => {
        const removedBricks = new Set();
        const q = queue([bidx]);
        for (const bidx of q) {
            const b = bricks[bidx];
            removedBricks.add(bidx);
            for (const otherIdx of b.supports) {
                const other = bricks[otherIdx];
                if (other.supportedBy.every((s) => removedBricks.has(s))) {
                    q.enqueue(otherIdx);
                }
            }
        }
        return removedBricks.size - 1;
    }));
}
export const solution = 96356;
