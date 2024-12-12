import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, memoize } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 65601038650482]];

const countBlinks = memoize((n, times) => {
    if (times === 0) return 1;
    if (n === "0") return countBlinks("1", times - 1);
    if (n.length % 2) return countBlinks(String(+n * 2024), times - 1);
    return countBlinks(n.slice(0, n.length / 2), times - 1) + countBlinks(String(+n.slice(n.length / 2)), times - 1);
})

export function solve(input) {
    let nums = input.split(" ");
    return sum(nums.map(n => countBlinks(n, 75)));
}
export const solution = 225253278506288;
