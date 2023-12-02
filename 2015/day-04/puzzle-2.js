import { createHash } from "crypto";

export const testCases = [];

export function solve(input) {
    if (input === "") return "wrong";
    for (let i = 0; ; i++) {
        if (
            createHash("md5")
                .update(input + i)
                .digest("hex")
                .startsWith("000000")
        ) {
            return i;
        }
    }
}
export const solution = 9962624;
