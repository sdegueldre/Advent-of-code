import { readFileSync } from "fs";
import { mincut } from "@graph-algorithm/minimum-cut";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 54]];

export function solve(input) {
    const lines = input.split("\n").map((l) => l.split(/:? /));
    const edges = [];
    const graph = {};
    for (const [l, ...rs] of lines) {
        graph[l] ||= new Set();
        for (const r of rs) {
            graph[l].add(r);
            graph[r] ||= new Set();
            graph[r].add(l);
            edges.push([l, r]);
        }
    }
    const cuts = [...mincut(edges)];
    for (const [l, r] of cuts) {
        graph[l].delete(r);
        graph[r].delete(l);
    }
    const graphSize = Object.keys(graph).length;
    const stack = [cuts[0][0]];
    const seen = new Set();
    while (stack.length) {
        const current = stack.pop();
        if (seen.has(current)) continue;
        seen.add(current);
        stack.push(...graph[current]);
    }
    return seen.size * (graphSize - seen.size);
}
export const solution = 533628;
