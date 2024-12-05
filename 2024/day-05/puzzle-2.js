import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 123]];

export function solve(input) {
    let [rules, updates] = input.split("\n\n");
    rules = rules.split("\n").map((r) => r.split("|"));
    updates = updates.split("\n").map((u) => u.split(","));
    const deps = {};
    for (const [before, after] of rules) {
        deps[after] ||= [];
        deps[after].push(before);
    }
    const invalidUpdates = updates.filter((update) => {
        const pages = new Set(update);
        const seen = new Set();
        for (const page of update) {
            seen.add(page);
            if (!(deps[page] || []).every((d) => !pages.has(d) || seen.has(d))) {
                return true;
            }
        }
        return false;
    });
    const recifiedUpdates = invalidUpdates.map((update) => {
        const pages = new Set(update);
        let rectified = [];
        const visited = new Set();
        const visit = (page) => {
            if (visited.has(page)) {
                return;
            }
            visited.add(page);
            for (const dep of (deps[page] || [])) {
                if (pages.has(dep)) {
                    visit(dep);
                }
            }
            rectified.push(page);
        }
        for (const page of update) {
            visit(page);
        }
        return rectified;
    });
    return sum(recifiedUpdates.map((u) => +u[(u.length - 1) / 2]));
}
export const solution = 5833;
