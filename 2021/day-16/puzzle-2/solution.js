const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const tests = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n');

function solution(input) {
    let bits = input.split('').flatMap(c => parseInt(c, 16).toString(2).padStart(4, '0').split('')).reverse();

    function parsePacket() {
        const [version, type] = parseHeader();
        return {
            version,
            type,
            value: type === 4 ? parseLiteral() : parseOperator(),
        }
    }
    
    function parseHeader() {
        const versionBits = popBits(3);
        const type = popBits(3);
        return [parseInt(versionBits, 2), parseInt(type, 2)];
    }

    function parseLiteral() {
        const literalBits = [];
        for (let done = false; !done;) {
            done = bits.pop() === '0';
            literalBits.push(popBits(4));
        }
        return parseInt(literalBits.join(''), 2);
    }

    function parseOperator() {
        if (bits.pop() === '0') {
            return parseFixedLengthOp();
        }
        return parseSubPacketsOp();
    }

    function parseFixedLengthOp() {
        const length = parseInt(popBits(15), 2);
        const stopAt = bits.length - length;
        const subPackets = [];
        while (bits.length > stopAt) {
            subPackets.push(parsePacket());
        }
        return subPackets;
    }

    function parseSubPacketsOp() {
        const nbPackets = parseInt(popBits(11), 2);
        const subPackets = [];
        for (let i = 0; i < nbPackets; i++) {
            subPackets.push(parsePacket());
        }
        return subPackets;
    }

    function popBits(n) {
        return bits.splice(-n).reverse().join('');
    }

    const packet = parsePacket();
    
    return evaluate(packet);
}


function evaluate({ type, value }) {
    switch (type) {
        case 0:
            return sum(value.map(p => evaluate(p)));
        case 1:
            return value.map(p => evaluate(p)).reduce((a, v) => a * v);
        case 2:
            return Math.min(...value.map(p => evaluate(p)));
        case 3:
            return Math.max(...value.map(p => evaluate(p)));
        case 4:
            return value;
        case 5:
            return evaluate(value[0]) > evaluate(value[1]) ? 1 : 0;
        case 6:
            return evaluate(value[0]) < evaluate(value[1]) ? 1 : 0;
        case 7:
            return evaluate(value[0]) === evaluate(value[1]) ? 1 : 0;
    }
}

for (const test of tests) {
    const [testInput, expected] = test.split(' ');
    const s = solution(testInput)
    console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);
    console.log('passed');
}

console.log(solution(input));