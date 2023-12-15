import { readFileSync } from "fs";
import { sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 145]];

const hash = (str) => {
    let hash = 0;
    for (const c of str) {
        hash = ((hash + c.charCodeAt(0)) * 17) % 256;
    }
    return hash;
};

export function solve(input) {
    const boxes = Array(256)
        .fill(0)
        .map(() => []);
    for (const step of input.split(",")) {
        const [label, op, foc] = step.split(/([=-])/);
        const box = boxes[hash(label)];
        const i = box.findIndex((l) => l.label === label);
        if (op === "-" && i !== -1) {
            box.splice(i, 1);
        } else if (op === "=") {
            if (i === -1) {
                box.push({ label, foc });
            } else {
                box[i].foc = foc;
            }
        }
    }
    return sum(boxes.map((box, j) => sum(box.map((l, i) => l.foc * (i + 1) * (j + 1)))));
}
export const solution = 279470;
