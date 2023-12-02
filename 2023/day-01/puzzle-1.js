import { readFileSync } from "fs";
import { sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 142]];

export function solve(input) {
    return sum(
        input
            .split("\n")
            .map((l) => l.match(/\d/g).map((n) => +n))
            .map((nums) => 10 * nums.at(0) + nums.at(-1))
    );
}
export const solution = 53386;
