import { enumerate } from "../utils.js";

export function splitLines(input, delimiter = " ") {
    return input.split("\n").map((l) => l.split(delimiter));
}

export function extractLines(input, regex, fieldNames) {
    const matches = input
        .split("\n")
        .map((l) => l.match(regex)?.slice(1))
        .filter(Boolean);
    if (!fieldNames) {
        return matches;
    }
    return matches.map((groups) => Object.fromEntries(zip(fieldNames, groups)));
}

export function magicParse(input, delimiter = " ") {
    return input
        .split("\n")
        .map((l) =>
            l.split(delimiter).map((group) => (group.match(/^[+-]?\d+(\.\d+)?$/) ? +group : group))
        );
}

export function getNums(line) {
    const res = line.match(/-?\d+/g)?.map((n) => +n);
    if (!res) {
        throw new Error(`Couldn't get nums from line:\n${line}`);
    }
    return res;
}

export function multiSplit(input, delimiter, ...delimiters) {
    return input.split(delimiter).map(part => delimiters.length ? multiSplit(part, delimiters) : part);
}

export function numberize(arr) {
    return enumerate(arr).map(([i, el]) => Array.isArray(el) ? numberize(el) : + el);
}
