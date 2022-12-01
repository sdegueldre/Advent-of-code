const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const [patterns, outputs] = zip(...input.split('\n')
        .map(l => l.split(' | ')
            .map(seq => seq.split(' '))
        )
    )
    return outputs.flat().filter(o => [2, 3, 4, 7].includes(o.length)).length;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));