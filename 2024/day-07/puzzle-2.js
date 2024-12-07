import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, getNums } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 11387]];

const achievable = (res, nums) => {
    if (nums.length === 1) {
        return res === nums[0];
    }
    return (
        achievable(res, [nums[0] + nums[1], ...nums.slice(2)]) ||
        achievable(res, [nums[0] * nums[1], ...nums.slice(2)]) ||
        achievable(res, [+(nums[0] + "" + nums[1]), ...nums.slice(2)])
    );
};

export function solve(input) {
    const lines = input.split("\n").map((l) => getNums(l));
    return sum(lines.map(([res, ...nums]) => (achievable(res, nums) ? res : 0)));
}
export const solution = 34612812972206;
