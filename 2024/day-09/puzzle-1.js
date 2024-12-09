import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 1928]];

export function solve(input) {
    const spaces = [...input].map((n) => +n);
    const diskSize = sum(spaces);
    const disk = Array(diskSize).fill(0);
    let lastFile = spaces.length - 1;
    let space = 0;

    const fillFile = (pos) => {
        const fileSize = spaces[space];
        for (let i = pos; i < pos + fileSize; i++) {
            disk[i] = space / 2;
        }
        space++;
        return pos + fileSize;
    };

    const fillBlank = (pos) => {
        let blankSize = spaces[space];
        while (blankSize) {
            while (spaces[lastFile] === 0) lastFile -= 2;
            disk[pos] = lastFile / 2;
            spaces[lastFile]--;
            pos++;
            blankSize--;
        }
        space++;
        return pos;
    };

    for (let i = 0; i < disk.length && space <= lastFile; i++) {
        if (!(space % 2)) {
            i = fillFile(i) - 1;
        } else {
            i = fillBlank(i) - 1;
        }
    }
    return sum(disk.map((n, i) => n * i));
}
export const solution = 6386640365805;
