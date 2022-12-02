import { readFileSync } from "fs";

export function getInputs(baseUrl) {
    return {
        input: readFileSync(new URL("./input", baseUrl)).toString().trim(),
        testInput: readFileSync(new URL("./input_test", baseUrl)).toString().trim(),
    }
}

/**
 * Creates groups of a given length inside an array.
 * Ex: ([1, 2, 3, 4], 2) => ([[1, 2], [2, 3], [3, 4]])
 *
 * @param {Array} arr the array from which to form groups
 * @param {number} len the length of the groups to form
 * @returns a new array containing groups of size len
 */
export function group(arr, len) {
    return arr.slice(0, -len+1).map((_, i) => arr.slice(i, i + len));
}

export function zip(...arr) {
    const length = Math.max(...arr.map(a => a.length));
    return arr.length ? Array(length).fill().map((_, i) => arr.map(row => row[i])) : [];
}

export function sum(arr) {
    return arr.reduce((acc, v) => acc + v, 0);
}

export function product(arr) {
    return arr.reduce((acc, v) => acc * v, 1);
}

export function pairWise(func, arr1, arr2) {
    return zip(arr1, arr2).map(el => func(el));
}

export function counter(arr) {
    return arr.reduce((O, x) => (O[x] = (O[x] || 0) + 1, O), {});
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
    return Array(length).fill().map((_, i) => arr[i%arr.length]);
}

export function* cartProduct(a, b) {
    b = [...b];
    for(const elA of a) {
        for (const elB of b) {
            yield [elA, elB];
        }
    }
}

export function* enumerate(arr) {
    for (let i = 0; i < arr.length; i++) yield [i, arr[i]];
}

export function assertEqual(actual, expected) {
    if (actual !== expected) {
        console.log(`assertion failed, expected "${expected}" but got "${actual}"`);
    } else {
        console.log(`test successful, got "${expected}"`);
    }
}

export function logThrough(val) {
    console.log(val);
    return val;
}
