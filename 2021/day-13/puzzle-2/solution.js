const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { performance } = require("perf_hooks");
const { zip, sum, counter, range, cartProduct } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n\n');


function solution(input) {
    const start = performance.now();
    const [points, instructions] = input.split('\n\n');
    const coords = points.split('\n').map(l => l.split(',').map(n => +n));
    const folds = instructions
        .split('\n')
        .map(l => l.split(' ')[2]
            .split('=')
        ).map(([dim, pos]) => [dim == 'x' ? 0 : 1, +pos]);
    for (const [dim, pos] of folds) {
        for (const point of coords) {
            if (point[dim] <= pos) {
                continue;
            }
            point[dim] = (point[dim] - pos) * -1 + pos;
        }
    }
    const maxX = Math.max(...coords.map(([x, y]) => x));
    const maxY = Math.max(...coords.map(([x, y]) => y));
    const dots = new Set(coords.map(p => p.join()));
    const grid = Array(maxY + 1)
        .fill()
        .map((_, y) => 
            Array(maxX + 1)
                .fill()
                .map((_, x) => 
                    dots.has([x,y].join()) ? "#" : " ")
        );
    const output = grid.map(l => l.join('')).join('\n');
    console.log(performance.now() - start);
    console.log(output);
}

//console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));