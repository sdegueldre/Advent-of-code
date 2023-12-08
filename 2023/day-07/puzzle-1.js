import { readFileSync } from "fs";
import { sum, zip, counter, shallowEqual } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 6440]];

const rank = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const compHands = (h1, h2) => {
    const counts1 = Object.values(counter(h1)).sort((a, b) => b - a);
    const counts2 = Object.values(counter(h2)).sort((a, b) => b - a);
    if (shallowEqual(counts1, counts2)) {
        for (const [c1, c2] of zip(h1, h2)) {
            if (rank.indexOf(c1) < rank.indexOf(c2)) return 1;
            if (rank.indexOf(c1) > rank.indexOf(c2)) return -1;
        }
        throw new Error("EQUAL HANDS");
    }
    for (const [c1, c2] of zip(counts1, counts2)) {
        if (c1 > c2) return 1;
        if (c1 < c2) return -1;
    }
    throw new Error("EQUAL HANDS");
};

export function solve(input) {
    const hands = input.split("\n").map((l) => l.split(" "));
    hands.sort(([h1], [h2]) => compHands(h1, h2));
    return sum(hands.map(([h, b], i) => +b * (i + 1)));
}
export const solution = 250370104;
