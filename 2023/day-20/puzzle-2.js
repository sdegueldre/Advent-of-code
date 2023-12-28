import { product, queue } from "../../utils.js";

export const testCases = [];

export function solve(input) {
    const mods = {};
    for (const line of input.split("\n")) {
        let [mod, outputs] = line.split(" -> ");
        outputs = outputs.split(", ");
        const type = mod[0];
        let name = mod.slice(1);
        if (type === "%") {
            mods[name] = { type, outputs, state: false };
        } else if (type === "&") {
            mods[name] = Object.assign(mods[name] || {}, { type, outputs });
        } else {
            name = mod;
            mods[name] = { type, outputs }; // broadcaster
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

    const toWatch = Object.keys(mods.rx.inputs)[0];
    const cycleLengths = [];
    for (let i = 1; ; i++) {
        const q = queue(mods.broadcaster.outputs.map((o) => [o, false, "broadcaster"]));
        for (const [target, signal, source] of q) {
            const mod = mods[target];
            if (mod.type === "%") {
                if (signal === false) {
                    mod.state = !mod.state;
                    q.enqueue(...mod.outputs.map((o) => [o, mod.state, target]));
                }
            } else if (mod.type === "&") {
                if (target === toWatch && signal) {
                    cycleLengths.push(i);
                    if (cycleLengths.length === 4) {
                        return product(cycleLengths);
                    }
                }
                mod.inputs[source] = signal;
                q.enqueue(
                    ...mod.outputs.map((o) => [
                        o,
                        !Object.values(mod.inputs).every(Boolean),
                        target,
                    ])
                );
            }
        }
    }
}
export const solution = 228282646835717;
