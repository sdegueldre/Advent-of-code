import { readFileSync } from "fs";
import { lcm } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 6]];

export function solve(input) {
    let [dirs, nodes] = input.split("\n\n");
    nodes = nodes.split("\n").map((l) => l.match(/(.*?) = \((.*)?, (.*)\)/).slice(1));
    nodes = Object.fromEntries(nodes.map(([n, L, R]) => [n, { L, R }]));
    const starts = Object.keys(nodes).filter((n) => n.endsWith("A"));

    const getCycleLength = (current) => {
        let seen = new Map();
        let cycle = [];
        let i = 0;
        while (true) {
            const j = i % dirs.length;
            i++;
            const key = [j, current].join();
            if (seen.has(key)) {
                return i - seen.get(key);
            }
            seen.set(key, i);
            current = nodes[current][dirs[j]];
            if (current.endsWith("Z")) {
                cycle.push([current, i]);
            }
        }
    };

    return starts.map(getCycleLength).reduce(lcm);
}
export const solution = 10668805667831;
