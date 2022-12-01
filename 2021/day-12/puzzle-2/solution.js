const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();
const test2 = readFileSync(resolve(__dirname, "./test2")).toString().trim();
const test3 = readFileSync(resolve(__dirname, "./test3")).toString().trim();

function solution(input) {
    const graph = {};
    const links = input.split('\n').map(l => l.split('-'));
    for (const [a, b] of links) {
        graph[a] = (graph[a] || []).concat([b]);
        graph[b] = (graph[b] || []).concat([a]);
    }
    return walk(graph, "start", "end").length;
}

function last(arr) {
    return arr[arr.length - 1]
}

function isBig(cave) {
    return cave[0] === cave[0].toUpperCase();
}

function walk(graph, start, end) {
    const partialPaths = [[start]];
    const completePaths = [];
    while (partialPaths.length) {
        const path = partialPaths.pop();
        for (const neighbour of graph[last(path)]) {
            if (neighbour === end) {
                completePaths.push([...path, end]);
            } else if (isBig(neighbour) || !path.includes(neighbour) || (neighbour != 'start' && !hasDupe(path))) {
                partialPaths.push([...path, neighbour]);
            }
        }
    }
    return completePaths;
}

function hasDupe(path) {
    return Math.max(...Object.values(counter(path.filter(c => !isBig(c))))) > 1;
}

const runTest = t => {
    [testInput, expected] = t.split('\n\n');
    console.assert(solution(testInput) === parseInt(expected, 10));
}
runTest(test);
runTest(test2);
runTest(test3);

console.log(solution(input));