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
        for (let seconds = ~~min * 60 + ~~sec; seconds > 0; seconds--) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(
                `You gave an answer too recently, waiting ${time} (${seconds}s remaining) before submitting.`
            );
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
    return [...arr.slice(0, -len + 1)].map((_, i) => arr.slice(i, i + len));
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

export function* enumGrid(grid) {
    for (const [y, row] of enumerate(grid)) {
        for (const [x, cell] of enumerate(row)) {
            yield { x, y, row, cell };
        }
    }
}

export function inGrid(row, col, grid) {
    return !(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length);
}

export function shallowEqual(a, b) {
    if (typeof a !== "object" || typeof b !== "object") {
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
        Object.entries(a).every(([k, v]) => deepEqual(v, b[k]))
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
    return input.split("\n").map((l) => l.split(delimiter));
}

export function toGrid(str, mapEl = c => c) {
    return str.split("\n").map((l) => [...l].map(mapEl));
}

export function shadowGrid(grid, val = 0) {
    return Array(grid.length).fill().map(r => Array(grid[0].length).fill(val));
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
        if (min <= last[1] + 1) {
            last[1] = Math.max(max, last[1]);
        } else {
            merged.push([min, max]);
        }
    }
    return merged;
}

export function intersectRanges([a, b], [c, d]) {
    if (a > d || b < c) return null;
    if (a >= c) {
        return b < d ? [a, b] : [a, d];
    }
    return b < d ? [c, b] : [c, d];
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
/** @type {[number, number][]} */
export const directNeighbors = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];
/** @type {[number, number][]} */
export const diagNeighbors = [
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
];
export const neighbors = [...diagNeighbors, ...directNeighbors];

/** @type {[number, number, number][]} */
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

/**
 * @overload
 * @param {number[]} arr1
 * @returns {(arr2: number[]) => number[]}
 */
/**
 * @overload
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number[]}
 */
/**
 * @param {number[]} arr1
 * @param {number[]} [arr2]
 * @returns {number[] | ((arr2: number[]) => number[])}
 */
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
    return zip(arr1, arr2).map(([a, b]) => a - b);
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
        toString() {
            return `queue[${this.show()
                .map((el) => JSON.stringify(el))
                .join(", ")}]`;
        },
        show() {
            return [...[...q].reverse(), ...s];
        },
        get size() {
            return s.length + q.length;
        },
    };
};

/**
 * @deprecated slow: use @see PriorityQueue instead
 * @template T
 * @param {T[]} items
 * @param {(a: T, b: T) => number} sort
 * @returns
 */
export const priorityQueue = (items = [], sort) => {
    const s = (a, b) => -sort(a, b);
    let q = [...items].sort(s);
    return {
        enqueue(...items) {
            q.push(...items);
            q.sort(s);
        },
        /**
         *
         * @returns {T}
         */
        dequeue() {
            return q.pop();
        },
        *[Symbol.iterator]() {
            while (q.length) {
                yield this.dequeue();
            }
        },
        toString() {
            return `queue[${this.show()
                .map((el) => JSON.stringify(el))
                .join(", ")}]`;
        },
        show() {
            return [...q].reverse();
        },
        get size() {
            return q.length;
        },
    };
};

const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;

/**
 * @template T
 */
export class PriorityQueue {
    /**
     * @param {T[]} items
     * @param {(a: T, b: T) => boolean} comparator
     */
    constructor(items, comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
        for (const item of items) {
            this.enqueue(item);
        }
    }
    size() {
        return this._heap.length;
    }
    peek() {
        return this._heap[top];
    }
    /**
     * @param {T[]} values
     */
    enqueue(...values) {
        values.forEach((value) => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }
    /**
     * @returns {T}
     */
    dequeue() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) {
            this._swap(top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
        let node = this.size() - 1;
        while (node > top && this._greater(node, parent(node))) {
            this._swap(node, parent(node));
            node = parent(node);
        }
    }
    _siftDown() {
        let node = top;
        while (
            (left(node) < this.size() && this._greater(left(node), node)) ||
            (right(node) < this.size() && this._greater(right(node), node))
        ) {
            let maxChild =
                right(node) < this.size() && this._greater(right(node), left(node))
                    ? right(node)
                    : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
    *[Symbol.iterator]() {
        while (this.size()) {
            yield this.dequeue();
        }
    }
}

export function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

export function gcd(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}

export function clamp(n, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
    return Math.min(Math.max(min, n), max);
}

export const box = `
┌─┐
│ │
└─┘
`
    .trim()
    .split("\n");

export function memoize(fn, makeKey = (...args) => JSON.stringify(args)) {
    const cache = new Map();
    return (...args) => {
        const key = makeKey(...args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

/**
 * @deprecated not debugged, probably wrong.
 * @param {number[][]} m1
 * @param {number[][]} m2
 * @returns
 */
export function matMult(m1, m2) {
    if (m1[0].length !== m2.length) {
        throw new Error(
            `cannot mult matrices of size ${[m1.length, m1[0].length]} and ${[
                m2.length,
                m2[0].length,
            ]}`
        );
    }

    const res = [];
    for (const [i, row] of enumerate(m1)) {
        const newRow = [];
        for (let j = 0; j < m2[0].length; j++) {
            newRow.push(
                sum(
                    zip(
                        row,
                        m2.map((r) => r[j])
                    ).map(([a, b]) => a * b)
                )
            );
        }
        res.push(newRow);
    }
    return res;
}

export const rotations = {
    right: [
        [0, -1],
        [1, 0],
    ],
    left: [
        [0, 1],
        [-1, 0],
    ],
};

export function rotateLeft([x, y]) {
    return matMult(rotations.left, [[x], [y]]).flat();
}

export function rotateRight([x, y]) {
    return matMult(rotations.right, [[x], [y]]).flat();
}

export const termColors = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    brightBlack: 90,
    brightRed: 91,
    brightGreen: 92,
    brightYellow: 93,
    brightBlue: 94,
    brightMagenta: 95,
    brightCyan: 96,
    brightWhite: 97,
    bgBlack: 40,
    bgRed: 41,
    bgGreen: 42,
    bgYellow: 43,
    bgBlue: 44,
    bgMagenta: 45,
    bgCyan: 46,
    bgWhite: 47,
    bgBrightBlack: 100,
    bgBrightRed: 101,
    bgBrightGreen: 102,
    bgBrightYellow: 103,
    bgBrightBlue: 104,
    bgBrightMagenta: 105,
    bgBrightCyan: 106,
    bgBrightWhite: 107,
};

export const tint = (char, color) => `\x1b[${termColors[color]}m${char}\x1b[0m`;

export function logGrid(grid, highlights = {}) {
    console.log(
        grid
            .map((r, y) =>
                [...r].map((c, x) => {
                    c ??= " ";
                    for (const [color, coords] of Object.entries(highlights)) {
                        if (coords.some((pos) => shallowEqual([x, y], pos))) {
                            return tint(c, color);
                        }
                    }
                    return c;
                })
            )
            .map((r) => r.join(""))
            .join("\n")
    );
}

export function area(vertices) {
    // Shoelace formula: sum the signed areas between each line segment and the x axis. Take absolute
    // value because this gives a signed area depending on which side of the segment the polygon is on
    return Math.abs(
        sum(window(vertices, 2).map(([[x1, y1], [x2, y2]]) => (x1 - x2) * (y2 + y1))) / 2
    );
}

export function perimeter(vertices) {
    return sum(window(vertices, 2).map(([a, b]) => dist(a, b)));
}
