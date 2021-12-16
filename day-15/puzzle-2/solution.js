const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');


function solution(input) {
    const board = input.split('\n').map(r => r.split('').map(c => +c));
    const grid = [];
    for (let i = 0; i < 5; i++) {
        for (const row of board) {
            grid.push([0, 1, 2, 3, 4].map(j => row.map(c => (c - 1 + i + j) % 9 + 1)).flat());
        }
    }
    const cost = grid.map(r => r.map(c => Infinity));
    cost[0][0] = 0;
    while (true) {
        const [x, y, currentCost] = extractMin(cost);
        const toRecompute = neighbours(x, y, grid)
            .filter(([x, y]) => x in cost && y in cost[x]);
        for (const [x, y] of toRecompute) {
            if (x === grid[0].length - 1 && y === grid.length - 1) {
                return currentCost + +grid[y][x];
            }
            cost[x][y] = Math.min(cost[x][y], currentCost + +grid[y][x]);
        }
        delete cost[x][y];
    }
}

function extractMin(cost) {
    const flat = [].concat(...cost);
    const min = arrMin(flat.filter(n => typeof n === 'number'));
    const idx = flat.indexOf(min);
    if (idx === -1) {
        throw new Error("what")
    }
    return [~~(idx/cost.length), idx%cost.length, min];
}

function arrMin(arr) {
    return arr.reduce((acc, v) => v < acc ? v : acc);
}

function key(x, y) {
    return [x, y].join();
}

function neighbours(x, y, board) {
    return [[1, 0], [-1, 0], [0, 1], [0, -1]]
        .map(([a, b]) => [x + a, y + b])
        .filter(([a, b]) => !(a == x && b == y) && inBounds(a, b, board));
}

// function neighbours(x, y, board) {
//     return [...cartProduct(range(-1, 1), range(-1, 1))]
//         .map(([a, b]) => [x + a, y + b])
//         .filter(([a, b]) => !(a == x && b == y) && inBounds(a, b, board));
// }

function inBounds(x, y, board) {
    return x >= 0 && y >= 0 && x < board[0].length && y < board.length;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));