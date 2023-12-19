import { readFileSync } from "fs";
import { sum } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 19114]];

const matchRule = (xmas, [field, cmp, operand, target]) => {
    if (cmp === "<") {
        return xmas[field] < operand && target;
    }
    return xmas[field] > operand && target;
};

export function solve(input) {
    let [workflows, parts] = input.split("\n\n");
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
    parts = parts.split("\n").map((p) =>
        p
            .slice(1, -1)
            .split(",")
            .map((c) => +c.slice(2))
    );
    return sum(
        parts
            .filter(([x, m, a, s]) => {
                let current = workflows.in;
                while (current) {
                    const next =
                        current.steps
                            .map((step) => matchRule({ x, m, a, s }, step))
                            .find(Boolean) || current.fallthrough;
                    if (next === "A") {
                        return true;
                    } else if (next === "R") {
                        return false;
                    }
                    current = workflows[next];
                }
            })
            .map(sum)
    );
}
export const solution = 323625;
