import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve } from "path";

/**
 * alias for String.raw, allows constructing regexp from strings without
 * escaping all the backslashes
 */
export const r = String.raw;

/**
 *
 * @param {string} year
 * @param {string} day
 * @returns
 */
export async function getInput(year, day) {
    const path = resolve(`./${year}/day-${day}/input`);
    if (existsSync(path)) {
        return readFileSync(path, "utf-8");
    }
    console.log(`Input not found for day ${day} ${year}, downloading`);
    const { cookie } = JSON.parse(readFileSync(resolve("./secrets.json"), "utf-8"));
    const url = `https://adventofcode.com/${year}/day/${+day}/input`;
    const res = await fetch(url, {
        headers: { cookie },
    });
    if (res.status !== 200) {
        throw new Error(`Fetching "${url}" failed with status ${res.status}:\n${await res.text()}`);
    }
    const input = (await res.text()).trim();
    await writeFileSync(path, input);
    return input;
}

export async function submit(answer, year, day, level) {
    const { cookie } = JSON.parse(readFileSync(resolve("./secrets.json"), "utf-8"));
    const url = `https://adventofcode.com/${year}/day/${+day}/answer`;
    const body = new URLSearchParams({ level, answer });
    const res = await fetch(url, {
        body,
        headers: { cookie, "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
    });
    if (res.status !== 200) {
        throw new Error(`Fetching "${url}" failed with status ${res.status}:\n${await res.text()}`);
    }
    const response = await res.text();
    if (response.includes("You gave an answer too recently")) {
        const match = response.match(/You have (.*?) left to wait/);
        if (!match) {
            console.error("You gave an answer too recently but the time couldn't be parsed.");
            return false;
        }
        const time = match[1];
        const [, min, sec] = time.match(/(?:(\d+)m )?(\d+)s/);
        for(let seconds = ~~min * 60 + ~~sec; seconds > 0; seconds--) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`You gave an answer too recently, waiting ${time} (${seconds}s remaining) before submitting.`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        console.log("");
        return submit(...arguments);
    } else if (response.includes("not the right answer")) {
        if (response.includes("too high")) {
            console.log("Answer is too high");
            return false;
        } else if (response.includes("too low")) {
            console.log("Answer is too low");
            return true;
        } else {
            console.log("Answer not correct");
            return false;
        }
    } else if (response.includes("That's the right answer!")) {
        return true;
    }
    console.log("Urecognized response while submitting, logging raw response");
    console.log(response);
    console.log("===========================================================");
    return false;
}

/**
 * Creates windows of a given length from an array.
 * Ex: ([1, 2, 3, 4], 2) => ([[1, 2], [2, 3], [3, 4]])
 *
 * @param {Array} arr the array from which to form windows
 * @param {number} len the length of the windows to form
 * @returns a new array containing windows of size len
 */
export function window(arr, len) {
    return arr.slice(0, -len + 1).map((_, i) => arr.slice(i, i + len));
}

export function chunk(arr, len) {
    arr = [...arr];
    return [...Array(Math.ceil(arr.length / len))].map((_, i) => arr.slice(i * len, (i + 1) * len));
}

export function zip(...arr) {
    const length = Math.max(...arr.map((a) => a.length));
    return arr.length
        ? Array(length)
              .fill(0)
              .map((_, i) => arr.map((row) => row[i]))
        : [];
}

export function sum(arr) {
    return arr.reduce((acc, v) => acc + v, 0);
}

export function product(arr) {
    return arr.reduce((acc, v) => acc * v, 1);
}

export function pairWise(func, arr1, arr2) {
    return zip(arr1, arr2).map((el) => func(el));
}

export function counter(iterable) {
    return [...iterable].reduce((O, x) => ((O[x] = (O[x] || 0) + 1), O), {});
}

export function* range(a, b) {
    const diff = Math.sign(b - a);
    if (!diff) {
        yield a;
        return;
    }
    yield a;
    while (a != b) yield (a += diff);
}

export function repeatToLength(arr, length) {
    return Array(length)
        .fill(0)
        .map((_, i) => arr[i % arr.length]);
}

export function* cartesianProduct(a, b) {
    b = [...b];
    for (const elA of a) {
        for (const elB of b) {
            yield [elA, elB];
        }
    }
}

export function* enumerate(enumerable) {
    let i = 0;
    for (const item of enumerable) yield [i++, item];
}

export function shallowEqual(a, b) {
    if (typeof a !== "object") {
        return a === b;
    }
    return (
        Object.keys(a).length === Object.keys(b).length &&
        Object.entries(a).every(([k, v]) => v === b[k])
    );
}

export function deepEqual(a, b) {
    if (typeof a !== "object") {
        return a === b;
    }
    return (
        Object.keys(a).length === Object.keys(b).length &&
        Object.entries(a).every(([k, v]) => deepEqual(v === b[k]))
    );
}

export function assertEqual(actual, expected) {
    if (!shallowEqual(actual, expected)) {
        console.log(
            `assertion failed, expected ${JSON.stringify(expected)} but got ${JSON.stringify(
                actual
            )}`
        );
        return false;
    }
    console.log(`test successful, got ${JSON.stringify(expected)}`);
    return true;
}

export function logThrough(val) {
    console.log(val);
    return val;
}

export function mod(num, base) {
    return ((num % base) + base) % base;
}

export function constrain(min, max) {
    return (val) => (val < min ? min : val > max ? max : val);
}

export function sortNums(arr) {
    return arr.sort((a, b) => a - b);
}

export function splitLines(input, delimiter = " ") {
    return input.split("\n").map(l => l.split(delimiter));
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

export function dist([x1, y1], [x2, y2]) {
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
}

export function manhattan([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

/**
 * These ranges are inclusive
 *
 * @param {[number, number][]} ranges
 * @returns
 */
export function mergeRanges(ranges) {
    ranges.sort(([min1], [min2]) => min1 - min2);
    const merged = [ranges[0]];
    for (const [min, max] of ranges.slice(1)) {
        const last = merged[merged.length - 1];
        if (min <= last[1]) {
            last[1] = Math.max(max, last[1]);
        } else {
            merged.push([min, max]);
        }
    }
    return merged;
}

export function* pyRange(start, stop, step = 1) {
    if (step === 0) {
        throw new Error("Step cannot be 0");
    }
    if (arguments.length === 1) {
        [start, stop] = [0, start];
    }
    if (step > 0) {
        for (let i = start; i < stop; i += step) {
            yield i;
        }
    } else {
        for (let i = start; i > stop; i += step) {
            yield i;
        }
    }
}

export const directNeighbors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];
export const diagNeighbors = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
];
export const neighbors = [...diagNeighbors, ...directNeighbors];

export const neighbors3d = [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0],
];

export const digits = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

export function pairSum(arr1, arr2) {
    if (arguments.length < 2) {
        return (arr2) => pairSum(arr1, arr2);
    }
    return zip(arr1, arr2).map(sum);
}

export function pairDiff(arr1, arr2) {
    if (arguments.length < 2) {
        return (arr2) => pairDiff(arr1, arr2);
    }
    return zip(arr1, arr2).map(sum);
}

/**
 *
 * @param {string} c
 * @returns a number from 0-25 for lower and 26-51 for upper
 */
export function letterNum(c) {
    if (!c.match(/^[A-Za-z]$/)) {
        throw new Error(`letterNum of non-letter: ${c}`);
    }
    const code = c.charCodeAt(0);
    return code > 90 ? code - 97 : code - 65 + 26;
}

// export function permutations(arr) {
//     if (arr.length <= 1) {
//         return [arr];
//     }
//     const [item, ...rest] = arr;
//     const res = [];
//     const restPerms = permutations(rest);
//     for(const perm of restPerms) {
//         for (let i = 0; i <= perm.length; i++) {
//             res.push([...perm.slice(0, i), item, ...perm.slice(i)]);
//         }
//     }
//     return res;
// }

export function permutations(arr) {
    if (arr.length <= 1) {
        return [arr];
    }
    return arr.flatMap((item, i) =>
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((perm) => [item, ...perm])
    );
}

function perm4(arr) {
    const toPermute = [...arr];
    /** @type {any[][]} */
    let permutations = [[]];
    while (toPermute.length) {
        const current = toPermute.pop();
        const newPerms = [];
        for (const perm of permutations) {
            for (let i = 0; i <= perm.length; i++) {
                newPerms.push([...perm.slice(0, i), current, ...perm.slice(i)]);
            }
        }
        permutations = newPerms;
    }
    return permutations;
}

export class Queue {
    constructor(initialItems) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        for (const item of initialItems) {
            this.enqueue(item);
        }
    }
    enqueue(value) {
        this.size++;
        if (!this.tail) {
            this.head = this.tail = { value };
        } else {
            this.tail.next = { value };
            this.tail = this.tail.next;
        }
    }
    dequeue() {
        this.size--;
        const { value } = this.head;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        return value;
    }
    get empty() {
        return !this.head;
    }
    asArray() {
        let current = this.head;
        const arr = [];
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}

export function dfs(start, isGoal, neighbors) {
    const stack = [start];
    const seen = new Set();
    while (stack.length) {
        const current = stack.pop();
        seen.add(current);
        if (isGoal(current)) {
            return current;
        }
        stack.push(...neighbors(current).filter((n) => !seen.has(n)));
    }
}

export function bfs(start, isGoal, neighbors) {
    const seen = new Set();
    const q = queue([start]);
    for (const current of q) {
        seen.add(current);
        if (isGoal(current)) {
            return current;
        }
        q.enqueue(...neighbors(current).filter((n) => !seen.has(n)));
    }
}

export const queue = (items = []) => {
    let s = [...items];
    let q = [];
    return {
        enqueue(...items) {
            s.push(...items);
        },
        dequeue() {
            if (!q.length) {
                q = s.splice(0).reverse();
            }
            return q.pop();
        },
        *[Symbol.iterator]() {
            while (s.length || q.length) {
                yield this.dequeue();
            }
        },
    };
};
