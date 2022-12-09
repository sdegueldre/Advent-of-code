import { readFileSync } from "fs";

export function getInputs(baseUrl) {
    return {
        input: readFileSync(new URL("./input", baseUrl)).toString(),
        testInput: readFileSync(new URL("./input_test", baseUrl)).toString(),
    }
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
    return arr.slice(0, -len+1).map((_, i) => arr.slice(i, i + len));
}

export function chunk(arr, len) {
    return [...Array(Math.ceil(arr.length / len))].map((_, i) => arr.slice(i * len, (i + 1) * len));
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

export function counter(iterable) {
    return [...iterable].reduce((O, x) => (O[x] = (O[x] || 0) + 1, O), {});
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

export function* cartesianProduct(a, b) {
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

export function shallowEqual(a, b) {
    if (typeof a !== "object") {
        return a === b;
    }
    return Object.keys(a).length === Object.keys(b).length && Object.entries(a).every(([k, v]) => v === b[k]);
}

export function assertEqual(actual, expected) {
    if (!shallowEqual(actual, expected)) {
        console.log(`assertion failed, expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    } else {
        console.log(`test successful, got ${JSON.stringify(expected)}`);
    }
}

export function logThrough(val) {
    console.log(val);
    return val;
}

export function mod(num, base) {
    return ((num % base) + base) % base;
}

export function constrain(min, max) {
    return val => val < min ? min : val > max ? max : val;
}

export function sortNums(arr) {
    return arr.sort((a, b) => a - b);
}

export function extractLines(input, regex, fieldNames) {
    return input.split("\n")
        .map(l => l.match(regex)?.slice(1))
        .filter(Boolean)
        .map(groups => Object.fromEntries(zip(fieldNames, groups)));
}

export function getNums(line) {
    return line.match(/\d+/g)?.map(n => +n);
}


export function dist([x1, y1],[x2, y2]) {
    return ((x2-x1)**2 + (y2-y1)**2)**.5;
}

export function* pyRange(start, stop, step = 1) {
    if (step === 0) {
        throw new Error("Step cannot be 0");
    }
    if (arguments.length ===  1) {
        [start, stop] = [0, start];
    }
    if (step > 0) {
        for(let i = start; i < stop; i += step) {
            yield i;
        }
    } else {
        for(let i = start; i > stop; i += step) {
            yield i;
        }
    }
}
