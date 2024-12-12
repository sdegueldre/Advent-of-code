import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 55312]];

export function solve(input) {
    let nums = input.split(" ");
    for (let i = 0; i < 25; i++) {
        nums = nums.flatMap(n => {
            if (n === "0") return "1";
            if (n.length % 2) return String(+n * 2024);
            return [n.slice(0, n.length/2), String(+n.slice(n.length/2))];
        });
    }
    return nums.length;
}
export const solution = 189167;
