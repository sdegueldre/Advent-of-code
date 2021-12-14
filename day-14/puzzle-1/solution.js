const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { performance } = require("perf_hooks");
const { zip, sum, counter, range, cartProduct } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n\n');


function solution(input) {
    let [polymer, insertions] = input.split('\n\n');
    insertions = Object.fromEntries(
        insertions.split('\n').map(i => i.split(' -> '))
    );
    const replacementRegex = new RegExp(
        Object.keys(insertions)
            .map(([a, b]) => `(?<=${a})(?=${b})`)
            .join('|'),
        'g',
    );
    for (let i = 1; i <= 10; i++) {
        polymer = polymer.replace(replacementRegex, (_, i) => insertions[polymer[i-1] + polymer[i]]);
    }
    const counts = Object.values(counter([...polymer]));
    return Math.max(...counts) - Math.min(...counts);
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));