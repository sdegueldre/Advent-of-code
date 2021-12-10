const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter, range } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

const charScores = { 
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

function solution(input) {
    const lines = input.split('\n');
    return sum(lines.map(l => score(l)))
}

const pairs = {
    '(': ')',
    '[': ']',
    '<': '>',
    '{': '}',
}
function score(line) {
    const stack = [];
    for (const char of line) {
        if (char in pairs) {
            stack.push(pairs[char]);
        } else if (stack.pop() !== char) {
            return charScores[char];
        }
    }
    return 0;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));