import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, magicParse } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 4]];

const isSafe = l => {
    const dir = Math.sign(l[1] - l[0])
    return l.every((el, i) => {
        if (i === 0) return true;
        const diff = el - l[i - 1];
        return Math.sign(diff) === dir && Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
    })
}

export function solve(input) {
    const matrix = magicParse(input);
    return sum(matrix.map(l => isSafe(l) || l.some((_, i) => isSafe(l.filter((_, j) => i !== j)))))
}
export const solution = 476;
