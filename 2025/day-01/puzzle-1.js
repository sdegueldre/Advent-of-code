import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 3]];

export function solve(input) {
    const nums = input.split("\n").map(([l, ...n]) => l === 'R' ? +n.join("") : -n.join(""));
    console.log(nums);
    let current = 50;
    let pw = 0;
    for (const num of nums) {
        current += num;
        if (current%100 === 0) {
            pw++;
        }
    }
    return pw;
}
export const solution = 1064;
