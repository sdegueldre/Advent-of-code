import { readFileSync } from "fs";
import { sum, zip, counter, shallowEqual } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 5905]];

const rank = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const compHands = (h1, h2) => {
    const counter1 = counter(h1);
    const counter2 = counter(h2);
    const cj1 = counter1.J || 0;
    const cj2 = counter2.J || 0;
    delete counter1.J;
    delete counter2.J;
    let counts1 = Object.entries(counter1).sort(
        ([ca, na], [cb, nb]) => nb - na || rank.indexOf(ca) - rank.indexOf(cb)
    );
    let counts2 = Object.entries(counter2).sort(
        ([ca, na], [cb, nb]) => nb - na || rank.indexOf(ca) - rank.indexOf(cb)
    );
    if (h1 === "JJJJJ") counts1 = [["", 0]];
    if (h2 === "JJJJJ") counts2 = [["", 0]];
    counts1[0][1] += cj1;
    counts2[0][1] += cj2;
    counts1 = counts1.map((n) => n[1]);
    counts2 = counts2.map((n) => n[1]);

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
export const solution = 251735672;
