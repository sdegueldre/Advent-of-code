import { readFileSync } from "fs";
import { enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 35]];

export function solve(input) {
    let [seeds, ...maps] = input.split("\n\n");
    seeds = seeds
        .split(": ")[1]
        .split(" ")
        .map((n) => +n);
    maps = maps.map((m) =>
        m
            .split(":\n")[1]
            .split("\n")
            .map((l) => l.split(" ").map((n) => +n))
    );
    for (const map of maps) {
        const newSeeds = [];
        for (const [to, from, len] of map) {
            for (const [i, seed] of enumerate(seeds)) {
                if (seed === null) continue;
                if (seed >= from && seed < from + len) {
                    newSeeds.push(seed - from + to);
                    seeds[i] = null;
                }
            }
        }
        seeds = seeds.filter((s) => s !== null).concat(newSeeds);
    }
    return Math.min(...seeds);
}
export const solution = 174137457;
