const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum, range, repeatToLength } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const lines = input.split('\n')
        .map(l => l.split(" -> ")
            .map(p => p.split(",")
                .map(n => +n)
            )
        );
    const points = [];
    for (const [[x1, y1], [x2, y2]] of lines) {
        for (const [x, y] of pointsBetween([x1, y1], [x2, y2])) {
            if (!points[x]) {
                points[x] = [];
            }
            points[x][y] = (points[x][y] || 0) + 1;
        }
    }
    return points.flat().reduce((acc, v) => acc + (v >= 2), 0);
}

const { max, abs } = Math;
function* pointsBetween(a, b) {
    const [[x1, x2], [y1, y2]] = zip(a, b);
    const nbPoints = max(abs(x1 - x2), abs(y1 - y2)) + 1;
    yield* zip(
        repeatToLength([...range(x1, x2)], nbPoints),
        repeatToLength([...range(y1, y2)], nbPoints),
    );
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));
