import { readFileSync } from "fs";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 2]];

const blacklist = ["ab", "cd", "pq", "xy"];

const isNice = (str) =>
    str.replace(/[^aeiou]/g, "").length >= 3 &&
    str.match(/(\w)\1/) &&
    blacklist.every((banned) => !str.includes(banned));

export function solve(input) {
    return input.split("\n").filter(isNice).length;
}
export const solution = 255;
