import { readFileSync } from "fs";
import { product, sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 167409079868000]];

const transform = (xmas, [field, cmp, operand, target]) => {
    const [min, max] = xmas[field];
    // No part in the input ever gets routed to a rule that is always true or always false
    // (eg x < 1000 where x is [200, 300]). If that was the case this would need to be adapted
    console.assert(operand >= min && operand <= max);
    if (cmp === "<") {
        return [
            { ...xmas, [field]: [operand, max] },
            { ...xmas, pos: target, [field]: [min, operand - 1] },
        ];
    }
    return [
        { ...xmas, [field]: [min, operand] },
        { ...xmas, pos: target, [field]: [operand + 1, max] },
    ];
};

export function solve(input) {
    let [workflows] = input.split("\n\n");
    workflows = Object.fromEntries(
        workflows
            .split("\n")
            .map((l) => l.match(/(.*)\{(.*)\}/))
            .map(([_, name, flow]) => {
                let steps = flow.split(",");
                const fallthrough = steps.pop();
                steps = steps.map((s) => {
                    s = s.split(/([<>:])/);
                    return [s[0], s[1], +s[2], s[4]];
                });
                return [name, { steps, fallthrough }];
            })
    );
    const parts = [{ pos: "in", x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }];
    const accepted = [];
    while (parts.length) {
        let current = parts.pop();
        const workflow = workflows[current.pos];
        for (const step of workflow.steps) {
            const [continueWith, splitPart] = transform(current, step);
            current = continueWith;
            if (splitPart.pos === "A") {
                accepted.push(splitPart);
            } else if (splitPart.pos !== "R") {
                parts.push(splitPart);
            }
        }
        if (workflow.fallthrough === "A") {
            accepted.push({ ...current, pos: "A" });
        } else if (workflow.fallthrough !== "R") {
            parts.push({ ...current, pos: workflow.fallthrough });
        }
    }
    const size = ([min, max]) => max - min + 1;
    return sum(accepted.map(({ x, m, a, s }) => product([x,m,a,s].map(size))));
}
export const solution = 127447746739409;
