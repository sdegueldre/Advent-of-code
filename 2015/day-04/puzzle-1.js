import { readFileSync } from "fs";
import { magicParse } from "../../utils.js";
import { createHash } from "crypto";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = magicParse(testInput);

export function solve(input) {
    if (input === "") return "wrong";
    for (let i = 0; ; i++) {
        if (
            createHash("md5")
                .update(input + i)
                .digest("hex")
                .startsWith("00000")
        ) {
            return i;
        }
    }
}
export const solution = 282749;
