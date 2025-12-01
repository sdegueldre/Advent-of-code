import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 6]];

export function solve(input) {
    const nums = input.split("\n").map(([l, ...n]) => l === 'R' ? +n.join("") : -n.join(""));
    console.log(nums);
    let current = 50;
    let pw = 0;
    for (const num of nums) {
        for (let i = 0; i < Math.abs(num); i++) {
            current += Math.sign(num);
            if (current%100 === 0) {
                pw++;
            }
        }
    }
    return pw;
}
export const solution = 6122;
