import { readFileSync } from "fs";
import { zip, product } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = zip(testInput.split("\n\n"), [32000000, 11687500]);

export function solve(input) {
    const mods = {};
    for (const line of input.split("\n")) {
        let [mod, outputs] = line.split(" -> ");
        outputs = outputs.split(", ");
        const type = mod[0];
        let name = mod.slice(1);
        if (type === "%") {
            mods[name] = {type, outputs, state: false};
        } else if (type === "&") {
            mods[name] = Object.assign(mods[name] || {}, {type, outputs});
        } else {
            name = mod;
            mods[name] = {type, outputs}; // broadcaster
        }
        for (const output of outputs) {
            const mod = mods[output] || {};
            if (mod.type === "&" || !mod.type) {
                mod.inputs ||= {};
                mod.inputs[name] = false;
            }
            mods[output] = mod;
        }
    }
    let pulseCount = [0, 0];
    for (let i = 0; i < 1000; i++) {
        pulseCount[0]++;
        const queue = mods.broadcaster.outputs.map(o => [o, false, "broadcaster"]);
        while (queue.length) {
            for (const [target, signal, source] of queue.splice(0)) {
                pulseCount[+signal]++;
                const mod = mods[target];
                if (mod.type === "%") {
                    if (signal === false) {
                        mod.state = !mod.state;
                        queue.push(...mod.outputs.map(o => [o, mod.state, target]))
                    }
                } else if (mod.type === "&") {
                    mod.inputs[source] = signal;
                    queue.push(...mod.outputs.map(o => [o, !Object.values(mod.inputs).every(Boolean), target]))
                }
            }
        }
    }
    return product(pulseCount);
}
export const solution = 814934624;
