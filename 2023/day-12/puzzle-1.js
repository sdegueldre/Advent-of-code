import { readFileSync } from "fs";
import { sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 21]];

const arrangements = (str, blocks) => {
    const [char] = str;
    if (!char) {
        return blocks.length === 0 ? 1 : 0;
    } else if (char === ".") {
        return arrangements(str.slice(1), blocks);
    } else if (char === "#") {
        const [block] = blocks;
        if (
            !block ||
            block > str.length ||
            str[block] === "#" ||
            str.slice(0, block).includes(".")
        ) {
            return 0;
        }
        return arrangements(str.slice(block + 1), blocks.slice(1));
    } else {
        return arrangements("." + str.slice(1), blocks) + arrangements("#" + str.slice(1), blocks);
    }
};

export function solve(input) {
    const lines = input
        .split("\n")
        .map((l) => l.split(" "))
        .map(([l, r]) => [l, r.split(",").map((n) => +n)]);
    return sum(lines.map(([row, blocks]) => arrangements(row, blocks)));
}
export const solution = 7771;
