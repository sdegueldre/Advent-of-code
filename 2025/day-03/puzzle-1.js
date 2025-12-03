import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, findWithPos } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 357]];

export function solve(input) {
    const banks = input.split("\n").map(l => l.split("").map(n => +n));
    const joltages = banks.map(bank => {
        const { pos: firstPos, item: firstDigit } = findWithPos(bank, ([i, a], [j, b]) => j === undefined || (a > b && i < bank.length - 1));
        const { pos: secondPos, item: secondDigit } = findWithPos(bank, ([i, a], [j, b]) => i > firstPos && (j === undefined || a > b));
        return +(String(firstDigit) + secondDigit);
    });
    return sum(joltages);
}
export const solution = 17196;
