import { readFileSync } from "fs";
import { digits, r, sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 281]];

/**
 *
 * @param {string} input
 */
export function solve(input) {
    const nums = [];
    for (const line of input.split("\n")) {
        const digitsRe = Object.keys(digits).join("|");
        const matches = [...line.matchAll(new RegExp(r`(?=(${digitsRe}|\d))`, "g"))];
        nums.push(
            +[matches[0], matches.at(-1)].map(([, digit]) => digits[digit] || +digit).join("")
        );
    }
    return sum(nums);
}
export const solution = 53312;
