import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, extractLines, splitLines, queue } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[[testInput, "d"], 72]];


export function solve(input, returnWire) {
    const wires = {};
    const q = queue(splitLines(input, " -> "));
    for (const [instruction, output] of q) {
        const idents = instruction.match(/[a-z]+/g);
        if (idents && !idents.every(i => i in wires)) {
            q.enqueue([instruction, output]);
            continue;
        }
        if (instruction.includes("AND")) {
            const [L, R] = instruction.split(" AND ");
            wires[output] = wires[L] & wires[R];
        } else if (instruction.includes("OR")) {
            const [L, R] = instruction.split(" OR ");
            wires[output] = wires[L] | wires[R];
        } else if (instruction.includes("LSHIFT")) {
            const [op, amt] = instruction.split(" LSHIFT ");
            wires[output] = (wires[op] << amt) & 0b1111111111111111;
        } else if (instruction.includes("RSHIFT")) {
            const [op, amt] = instruction.split(" RSHIFT ");
            wires[output] = (wires[op] >> amt) & 0b1111111111111111;;
        } else if (instruction.includes("NOT")) {
            const [_, op] = instruction.split("NOT");
            wires[output] = (~wires[op]) & 0b1111111111111111;;
        } else if (instruction.match(/\d+/)) {
            wires[output] = +instruction;
        } else {
            wires[output] = wires[instruction];
        }
    }
    // console.log(wires);
    return wires[returnWire || "a"];
}
export const solution = undefined;
