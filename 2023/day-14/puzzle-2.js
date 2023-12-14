import { readFileSync } from "fs";
import { zip, enumerate, counter } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 64]];

const load = (lines) => {
    let total = 0;
    for (const line of lines) {
        let lineTotal = 0;
        for (const [i, char] of enumerate(line)) {
            if (char === "O") {
                total += line.length - i;
                lineTotal += line.length - i;
            }
        }
    }
    return total;
};

const rotateLeft = (grid) => zip(...grid).reverse();
const rotateRight = (grid) => zip(...grid.reverse());

export function solve(input) {
    let lines = input.split("\n").map((l) => [...l]);
    lines = rotateLeft(lines);
    const seen = new Map();
    for (let cycle = 0; cycle < 1000000000; cycle++) {
        for (let i = 0; i < 4; i++) {
            for (const line of lines) {
                let lastRock = 0;
                for (const [i, char] of enumerate(line)) {
                    if (char === "#") {
                        const count = counter(line.slice(lastRock, i));
                        const roundCount = count.O || 0;
                        line.splice(
                            lastRock,
                            i - lastRock,
                            ..."O".repeat(roundCount),
                            ...".".repeat(i - lastRock - roundCount)
                        );
                        lastRock = i + 1;
                    }
                }
                const i = line.length;
                const count = counter(line.slice(lastRock, i));
                const roundCount = count.O || 0;
                line.splice(
                    lastRock,
                    i - lastRock,
                    ..."O".repeat(roundCount),
                    ...".".repeat(i - lastRock - roundCount)
                );
                lastRock = i + 1;
            }
            lines = rotateRight(lines);
        }
        const key = lines.map((l) => l.join("")).join("\n");
        if (seen.has(key)) {
            const cycleLength = cycle - seen.get(key);
            const cyclesLeft = Math.floor((1_000_000_000 - cycle) / cycleLength);
            cycle += cyclesLeft * cycleLength;
        } else {
            seen.set(key, cycle);
        }
    }
    return load(lines);
}
export const solution = 99118;
