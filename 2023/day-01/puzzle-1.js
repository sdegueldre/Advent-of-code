import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 142]];

export function solve(input) {
    return sum(
        input
            .split("\n")
            .map(
                (l) =>
                    +[...l]
                        .filter((c) => c.match(/\d/))
                        .map((n) => +n)
                        .filter((_, i, a) => i === 0 || i === a.length - 1)
                        .join("")
            )
            .map((n) => (n < 10 ? +`${n}${n}` : n))
    );
}
export const solution = 53386;
