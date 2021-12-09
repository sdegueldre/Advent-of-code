const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter, range } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const heightMap = input.split('\n').map(l => l.split('').map(n => +n));
    const width = heightMap.length - 1;
    const height = heightMap[0].length - 1;
    const minima = [];
    for (const x of range(0, width)) {
        for (const y of range(0, height)) {
            const height = heightMap[x][y];
            const isMin = neighbours(x, y, heightMap)
                .every(neighbourHeight => neighbourHeight > height);
            if (isMin) {
                minima.push(height);
            }
        }
    }
    return sum(minima.map(m => m + 1));
}

function neighbours(a, b, map) {
    const width = map.length - 1;
    const height = map[0].length - 1;
    const inBoard = (x, y) => x >= 0 && y >= 0 && x <= width && y <= height;
    const res = [];
    for (const x of range(a - 1, a + 1)) {
        for (const y of range(b - 1, b + 1)) {
            if (inBoard(x, y) && !(x == a && y == b)) {
                res.push(map[x][y]);
            }
        }
    }
    return res;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));