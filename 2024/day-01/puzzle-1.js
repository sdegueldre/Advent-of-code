import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, pairDiff } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 11]];

export function solve(input) {
    return sum(
        pairDiff(
            ...zip(...input.split("\n").map((l) => l.split(/\s+/).map((n) => +n))).map((a) =>
                a.sort((a, b) => a - b)
            )
        ).map((n) => Math.abs(n))
    );
}
export const solution = 2742123;
