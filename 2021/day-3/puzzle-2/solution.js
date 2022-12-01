const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, counter } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const nums = input.split('\n');
    const bits = nums => zip(...nums.map(num => num.split('').map(b => +b)));
    // How many more zeroes than ones
    const bitDelta = bits => {
        const count = counter(bits);
        return count[0] - count[1];
    }

    let gammaCandidates = [...new Set(nums)];
    for (let pos = 0; gammaCandidates.length > 1; pos++) {
        const delta = bitDelta(bits(gammaCandidates)[pos]);
        const chosenBit = delta > 0 ? "0" : "1";
        gammaCandidates = [...new Set(gammaCandidates.filter(num => num[pos] === chosenBit))];
    }
    const gamma = gammaCandidates[0];

    let epsilonCandidates = [...new Set(nums)];
    for (let pos = 0; epsilonCandidates.length > 1; pos++) {
        const delta = bitDelta(bits(epsilonCandidates)[pos]);
        const chosenBit = delta > 0 ? "1" : "0";
        epsilonCandidates = [...new Set(epsilonCandidates.filter(num => num[pos] === chosenBit))];
    }
    const epsilon = epsilonCandidates[0];

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));