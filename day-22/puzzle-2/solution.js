const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group, enumerate, product } = require("../../utils");
const { exit } = require("process");
const { Console } = require("console");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n\n');

function solution(input) {
    const cuboids = input.split('\n')
        .map(l => l.split(/ x=|,y=|,z=/)
            .map(t => ['on', 'off'].includes(t) ? t : t.split('..')
                .map(n => BigInt(n))));
    const positiveCuboids = [];
    const negativeCuboids = [];
    for (const [status, x, y, z] of cuboids) {
        // if ([x, y, z].some(([n1, n2]) => !inside([-50, 50], n1) || !inside([-50, 50], n2))) {
        //     console.log('skip', {x, y, z});
        //     continue;
        // }
        const toRem = [];
        const toAdd = [];
        for (const other of positiveCuboids) {
            const common = intersection([x, y, z], other);
            if (common) {
                toRem.push(common)
            }
        }
        for (const other of negativeCuboids) {
            const common = intersection([x, y, z], other);
            if (common) {
                toAdd.push(common)
            }
        }
        if (status === "on") {
            toAdd.push([x, y, z]);
        }
        positiveCuboids.push(...toAdd);
        negativeCuboids.push(...toRem);
    }
    return sum(positiveCuboids.map(volume)) - sum(negativeCuboids.map(volume));
}

function volume(c) {
    return product(c.map(([a, b]) => b - a + 1n));
}

function intersection(a, b) {
    const ret = zip(a, b).map(([r1, r2]) => segmentOverlap(r1, r2));
    return ret.some(el => el === null) ? null : ret;
}

function min(a, b) {
    return a < b ? a : b;
}

function max(a, b) {
    return a > b ? a : b;
}

function segmentOverlap(a, b) {
    if (inside(a, b[0])) {
        return [b[0], min(a[1], b[1])];
    } else if (inside(a, b[1])) {
        return [max(a[0], b[0]), b[1]];
    // if neither point of b is in a but one point of a is in b they both are
    } else if (inside(b, a[0])) {
        return a;
    }
    return null;
}

function inside(s, n) {
    return n >= s[0] && n <= s[1];
}

const [testInput, expected] = test;
const s = solution(testInput)
console.assert(s === BigInt(expected), `Got ${s}, expected ${expected}`);

console.log(solution(input));
