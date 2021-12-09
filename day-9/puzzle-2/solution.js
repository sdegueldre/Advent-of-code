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
            const isMin = neighboursOf(x, y, heightMap)
                .every(([nx, ny]) => heightMap[nx][ny] > heightMap[x][y]);
            if (isMin) {
                minima.push([x, y]);
            }
        }
    }
    const basins = minima.map(([x, y]) => basinFor(x, y, heightMap));
    return basins.map(b => b.length)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, v) => acc * v);
}

function neighboursOf(a, b, map) {
    const width = map.length - 1;
    const height = map[0].length - 1;
    const inBoard = (x, y) => x >= 0 && y >= 0 && x <= width && y <= height;
    const res = [];
    for (const [x, y] of [[a - 1, b], [a, b - 1], [a + 1, b], [a, b + 1]]) {
        if (inBoard(x, y)) {
            res.push([x, y]);
        }
    }
    return res;
}

function basinFor(x, y, map) {
    const visited = new Set();
    const basinStrings = new Set([`${x},${y}`]);
    const basin = [[x,y]];
    while (true) {
        const neighbours = basin.filter(p => !visited.has(p.join(',')))
            .flatMap(p => neighboursOf(...p, map))
            .filter(([x, y]) => map[x][y] != 9)
        if (!neighbours.length) {
            break;
        }
        for (const point of basin) {
            visited.add(point.join(','));
        }
        for (const point of neighbours) {
            if (!basinStrings.has(point.join(','))) {
                basin.push(point)
                basinStrings.add(point.join(','))
            }
        }
    }
    return basin;
}
console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));