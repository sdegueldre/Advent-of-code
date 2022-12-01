const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n\n');


function solution(input) {
    const start = performance.now();
    let [polymer, insertions] = input.split('\n\n');
    insertions = Object.fromEntries(
        insertions.split('\n').map(i => i.split(' -> '))
    );

    const cache = new Map();
    function step(pair, n) {
        const cacheKey = [pair, n].join();
        if (!cache.has(cacheKey)) {
            let res;
            if (n === 1) {
                res = {[insertions[pair]]: 1};
            } else {
                const left = pair[0] + insertions[pair];
                const right = insertions[pair] + pair[1];
                const inner = addCounts(step(left, n - 1), step(right, n - 1))
                res = addCounts(inner, {[insertions[pair]]: 1});
            }
            cache.set(cacheKey, res);
        }
        return cache.get(cacheKey);
    }

    const pairs = group([...polymer], 2).map(g => g.join(''));

    const count = pairs.map(p => step(p, 40)).concat(counter([...polymer])).reduce((acc, v) => addCounts(acc, v));
    const counts = Object.values(count);
    const res = Math.max(...counts) - Math.min(...counts);
    console.log("Time:", performance.now() - start);
    return res;
}

function addCounts(a, b) {
    let ret = Object.assign({}, a);
    for(const [k, v] of Object.entries(b)) {
        ret[k] = (ret[k] || 0) + v;
    }
    return ret;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));