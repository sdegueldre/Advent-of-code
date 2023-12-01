import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, range } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 281]];

const digits = [
    "slmkqdfmsldkfmlqksjf",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];
export function solve(input) {
    return sum(
        input.split("\n").map((l) => {
            let indices = [];
            for (const num of range(0, 10)) {
                indices.push([l.indexOf(num), num]);
            }
            for (const [i, digit] of enumerate(digits)) {
                indices.push([l.indexOf(digit), i]);
            }

            let endIndices = [];
            for (const num of range(0, 10)) {
                endIndices.push([l.lastIndexOf(num), num]);
            }
            for (const [i, digit] of enumerate(digits)) {
                endIndices.push([l.lastIndexOf(digit), i]);
            }
            indices = indices.filter(([i]) => i !== -1);
            endIndices = endIndices.filter(([i]) => i !== -1);
            const minIndex = Math.min(...indices.map(([i]) => i));
            const maxIndex = Math.max(...endIndices.map(([i]) => i));
            return +[
                indices.find(([i]) => i === minIndex)[1],
                endIndices.find(([i]) => i === maxIndex)[1],
            ].join("");
        })
    );
}
export const solution = 53312;
