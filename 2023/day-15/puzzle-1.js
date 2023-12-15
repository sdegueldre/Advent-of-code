import { readFileSync } from "fs";
import { sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1320]];

const hash = (str) => {
    let hash = 0;
    for (const c of str) {
        hash = ((hash + c.charCodeAt(0)) * 17) % 256;
    }
    return hash;
};

export function solve(input) {
    return sum(input.split(",").map(hash));
}
export const solution = 514639;
