import { readFileSync } from "fs";
import { chunk, intersectRanges, mergeRanges } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 46]];

export function solve(input) {
    let [seeds, ...maps] = input.split("\n\n");
    seeds = chunk(
        seeds
            .split(": ")[1]
            .split(" ")
            .map((n) => +n),
        2
    ).map(([lo, len]) => [lo, lo + len - 1]);
    maps = maps.map((m) =>
        m
            .split(":\n")[1]
            .split("\n")
            .map((l) => l.split(" ").map((n) => +n))
    );
    for (const map of maps) {
        let newSeeds = [];
        for (const [to, from, len] of map) {
            seeds = seeds.flatMap((seedRange) => {
                const toMove = intersectRanges([from, from + len - 1], seedRange);
                if (!toMove) {
                    return [seedRange];
                }
                newSeeds.push([toMove[0], toMove[1]].map((n) => n - from + to));
                return [
                    [seedRange[0], toMove[0] - 1],
                    [toMove[1] + 1, seedRange[1]],
                ].filter(([lo, hi]) => lo <= hi);
            });
        }
        seeds = mergeRanges(newSeeds.concat(seeds));
    }
    return Math.min(...seeds.map(([min]) => min));
}
export const solution = 1493866;
