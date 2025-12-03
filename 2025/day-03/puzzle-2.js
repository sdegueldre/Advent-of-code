import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, findWithPos } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 3121910778619]];

export function solve(input) {
    const banks = input.split("\n").map(l => l.split("").map(n => +n));
    const joltages = banks.map(bank => {
        let joltage = "";
        let prevDigitPos = -1;
        for (let i = 0; i < 12; i++) {
            const { pos, item: digit } = findWithPos(bank, ([aPos, a], [bPos, b]) => {
                return aPos < bank.length - (12 - i - 1) && aPos > prevDigitPos && (bPos === undefined || a > b)
            });
            joltage += digit;
            prevDigitPos = pos;
        }
        return +joltage;
    });
    return sum(joltages);
}
export const solution = 171039099596062;
