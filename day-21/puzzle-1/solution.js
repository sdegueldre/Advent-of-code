const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group, enumerate } = require("../../utils");
const { exit } = require("process");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n\n');

function solution(input) {
    let [pos1, pos2] = input.split('\n').map(l => +l.split(': ')[1]);
    const p1 = { pos: pos1 - 1, score: 0 };
    const p2 = { pos: pos2 - 1, score: 0 };
    const roll = makeRoll();
    for (let p1Turn = true; p1.score < 1000 && p2.score < 1000; p1Turn = !p1Turn) {
        const player = p1Turn ? p1 : p2;
        for (const result of roll()) {
            player.pos = (player.pos + result) % 10;
        }
        player.score += player.pos + 1;
    }
    return Math.min(p1.score, p2.score) * roll.totalRolls;
}

function makeRoll() {
    let i = 0;
    const roll = () => {
        const ret = [];
        for (let j = 0; j < 3; j++, i++) {
            roll.totalRolls++;
            i %= 100;
            ret.push(i + 1);
        }
        return ret;
    }
    roll.totalRolls = 0;
    return roll;
}

const [testInput, expected] = test;
const s = solution(testInput)
console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);

console.log(solution(input));
