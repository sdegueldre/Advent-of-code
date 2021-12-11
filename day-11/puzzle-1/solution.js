const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');


function solution(input) {
    const board = input.split('\n').map(l => l.split('').map(n => +n));
    let flashes = 0;
    for (let i = 0; i < 100; i++) {
        let flashed = new Set();
        const key = (x, y) => [x, y].join();
        function step(x, y) {
            if (!flashed.has(key(x, y))) {
                board[y][x] += 1;
                if (board[y][x] > 9) {
                    flash(x, y);
                }
            }
        }
        function flash(x, y) {
            if (!flashed.has(key(x, y))) {
                flashed.add(key(x, y));
                board[y][x] = 0;
                [...neighbours(x, y, board)].forEach(([x, y]) => step(x, y));
            }
        }
        each(board, ([x, y]) => step(x, y));
        flashes += flashed.size;
    }
    return flashes;
}

function each(b, f) {
    return b.forEach((l, y) => l.forEach((n, x) => f([x,y])));
}

function neighbours(x, y, board) {
   return [...cartProduct(range(-1, 1), range(-1, 1))]
   .map(([a, b]) => [x + a, y + b])
   .filter(([a, b]) => !(a == x && b == y) && inBounds(a, b, board));
}

function inBounds(x, y, board) {
    return x >= 0 && y >= 0 && x < board[0].length && y < board.length;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));