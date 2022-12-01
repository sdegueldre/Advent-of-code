const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group, enumerate } = require("../../utils");
const { exit } = require("process");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n\n\n');

function solution(input) {
    let [filter, image] = input.split('\n\n');
    filter = filter.split('').map(c => c === '.' ? 0 : 1);
    image = image.split('\n').map(l => l.split('').map(c => c === '.' ? 0 : 1));
    image.outsideVal = 0;
    logImage(image);
    for (let i = 0; i < 2; i++) {
        image = refine(image, filter);
        logImage(image);
    }
    return image.flat().filter(px => px === 1).length;
}

function refine(image, filter) {
    padImage(image);
    console.log("AFTER PADDING:")
    logImage(image);
    const res = image.map((row, y) => {
        return row.map((px, x) => {
            const nb = neighbours(y, x, image);
            const digits = nb.map(([y, x]) => {
                if (!(y in image) || !(x in image[y])) {
                    return image.outsideVal;
                }
                return image[y][x];
            });
            const index = parseInt(digits.join(''), 2);
            return filter[index];
        })
    });
    res.outsideVal = image.outsideVal ? filter[511] : filter[0];
    return res;
}

function padImage(image) {
    const val = image.outsideVal;
    image.unshift(image[0].map(() => val));
    image.push(image[0].map(() => val));
    for (const row of image) {
        row.unshift(val);
        row.push(val);
    }
}

function neighbours(x, y, board) {
    return [...cartProduct(range(-1, 1), range(-1, 1))]
        .map(([a, b]) => [x + a, y + b])
}

function logImage(image) {
    console.log("Image size:", { width: image[0].length, height: image.length });
    console.log(image.map(r => r.map(n => n ? '#' : ' ').join('')).join('\n'), '\n');
}

const [testInput, expected] = test;
const s = solution(testInput)
console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);

console.log(solution(input));
