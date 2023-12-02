import { readFileSync } from "fs";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 2]];


const isNice = (str) => str.match(/(\w\w).*\1/) && str.match(/(\w).\1/);

export function solve(input) {
    return input.split("\n").filter(isNice).length;
}
export const solution = 55;
