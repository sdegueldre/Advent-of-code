import { readFileSync } from "fs";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 6]];

export function solve(input) {
    let [dirs, nodes] = input.split("\n\n");
    nodes = nodes.split("\n").map((l) => l.match(/(.*?) = \((.*)?, (.*)\)/).slice(1));
    nodes = Object.fromEntries(nodes.map(([n, L, R]) => [n, { L, R }]));
    let current = "AAA";

    let i;
    for (i = 0; current !== "ZZZ"; i++) {
        const j = i % dirs.length;
        current = nodes[current][dirs[j]];
    }
    return i;
}
export const solution = 16697;
