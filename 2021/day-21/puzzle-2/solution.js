const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group, enumerate } = require("../../utils");
const { exit } = require("process");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n\n');

function solution(input) {
    let [pos1, pos2] = input.split('\n').map(l => +l.split(': ')[1]);
    const p1 = {
        pos: {[pos1 - 1]: 1n},
        score: {0: 1n},
        get maxScore() {
            return Math.max(...Object.keys(this.score).map(k => +k));
        }
    };
    const p2 = {
        pos: {[pos2 - 1]: 1n},
        score: {0: 1n},
        get maxScore() {
            return Math.max(...Object.keys(this.score).map(k => +k));
        }
    };
    const roll = makeRoll();
    for (let p1Turn = true; p1.maxScore < 21 && p2.maxScore < 21; p1Turn = !p1Turn) {
        const player = p1Turn ? p1 : p2;
        player.pos = combineDistributions(player.pos, roll(), (pos, roll) => (+pos + +roll) % 10);
        player.score = combineDistributions(player.score, player.pos, (score, pos) => +score + +pos + 1);
        console.log({player })
    }
    console.log({p1, p2});
    return Math.min(p1.score, p2.score) * roll.totalRolls;
}

function makeRoll() {
    const roll = () => {
        const rollDist = {
            1: 1n,
            2: 1n,
            3: 1n,
        }
        return multiplyDistributions(multiplyDistributions(rollDist, rollDist), rollDist);
    }
    return roll;
}

function multiplyDistributions(d1, d2) {
    return combineDistributions(d1, d2, (k1, k2) => +k1 + +k2)
}

function combineDistributions(d1, d2, combine) {
    const dist = {};
    for (const [k1, v1] of Object.entries(d1)) {
        for (const [k2, v2] of Object.entries(d2)) {
            const key = combine(k1, k2);
            const value = v1 * v2;
            dist[key] = (dist[key] || 0n) + value;
        }
    }
    return dist;
}

const [testInput, expected] = test;
const s = solution(testInput)
console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);

// console.log(solution(input));
