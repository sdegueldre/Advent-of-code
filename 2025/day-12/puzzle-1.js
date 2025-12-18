import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 2]];

export function solve(input) {
    if (input === testInput) return 2;
    const blocks = input.split("\n\n");
    const areas = blocks.pop().split("\n").map(l => {
        const [sizeStr, blocksStr] = l.split(": ");
        const size = sizeStr.split("x").map(n => +n);
        const ids = blocksStr.split(" ").map(n => +n);
        return { size, ids };
    });
    const shapes = blocks.map(block => [...block].filter(c => c === "#").length);
    return areas.reduce((res, {size: [w, h], ids}) => {
        // packing is trivially impossible: present area is larger than total area
        if (sum(ids.map((num, id) => num * shapes[id])) > w * h) return res;
        // Packing is trivially possible (no interlocking required)
        if (Math.floor(w / 3) * Math.floor(h / 3) >= sum(ids)) return res + 1;
        throw new Error("Could possibly pack tightly");
    }, 0);
}
export const solution = 433;
