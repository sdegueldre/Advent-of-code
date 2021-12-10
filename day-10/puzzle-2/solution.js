const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter, range } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

const charScores = { 
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};

function solution(input) {
    const lines = input.split('\n');
    const scores = lines
        .map(l => score(l))
        .filter(Boolean)
        .sort((b, a) => b - a);
    return scores[(scores.length - 1) / 2];
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
            return 0;
        }
    }
    return stack.reverse().reduce((acc, v) => 5 * acc + charScores[v], 0);
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));