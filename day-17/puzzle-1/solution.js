const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n');

function solution(input) {
    const [part1, part2] = input.split(', y=');
    const xs = part1.slice(15).split('..').map(n => +n);
    const ys = part2.split('..').map(n => +n);
    // maxX = vx (vx + 1) / 2
    // vx to reacha  particular x0:
    // vx² + vx - 2*x0 = 0 => rho = 1 - 8*x0, sols = (-1 + sqrt(1 + 8*x0))/2
    const minVx = Math.ceil((-1 + Math.sqrt(1 + 8 * xs[0])) / 2)
    const maxVx = Math.floor((-1 + Math.sqrt(1 + 8 * xs[1])) / 2)
    for (let vx = minVx; vx <= maxVx; vx++) {
        const steps = getSteps(vx, ...xs);
        for (const s of steps) {
            // totalY = -s² + svy > y0 => vy > y0/s + s
            const minVy = Math.ceil(ys[0] / s + s);
            const maxVy = Math.floor(ys[1] / s + s);
            console.log({vx, s, minVy, maxVy});
        }
    }
}

function getSteps(vx, xMin, xMax) {
    const steps = [];
    for (let x = 0, i = 0; vx; x += vx--, i++) {
        if (x <= xMax && x >= xMin) {
            steps.push(i);
        }
    }
    return steps;
}

const [testInput, expected] = test;
const s = solution(testInput)
console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);

// console.log(solution(input));