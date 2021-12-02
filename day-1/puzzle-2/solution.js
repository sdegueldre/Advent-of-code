const { readFileSync } = require("fs");
const { group, sum } = require("../../utils");
const { resolve } = require("path");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

// Note: because the sliding windows have every element in common except the first
// of the first one and the last of the second one, we could ignore the every number
// except those. Eg: [1,2,3,4,5] => ([1,2,3], [2,3,4]), 2,3 are common, only compare
// 1 and 4 directly. This isn't worth doing because of the size of the sliding window
function solution(input) {
    const nums = input.split("\n").map(n => parseInt(n, 10));
    const sums = group(nums, 3).map(sum);
    return group(sums, 2).filter(([a, b]) => b > a).length;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input)); //1103
