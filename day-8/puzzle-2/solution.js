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
    );
    const mappings = patterns.map(p => extractMapping(p));
    const mapped = zip(mappings, outputs)
        .map(([mapping, output]) => {
            return +output.map(num => {
                const key = [...num].sort().join('');
                return mapping[key];
            }).join('');
        });
    return sum(mapped);
}

const defaultMappings = {
    'abcefg': 0,
    'cf': 1,
    'acdeg': 2,
    'acdfg': 3,
    'bcdf': 4,
    'abdfg': 5,
    'abdefg': 6,
    'acf': 7,
    'abcdefg': 8,
    'abcdfg': 9,
}
const appearancesToChar = Object.fromEntries([...'abcdefg']
    .map(char => [
        statsFor(char, Object.keys(defaultMappings)),
        char,
    ])
);

function extractMapping(patterns) {
    const charMappings = Object.fromEntries(
        [...'abcdefg'].map(char => [appearancesToChar[statsFor(char, patterns)], char])
    );
    return Object.fromEntries(Object.entries(defaultMappings).map(([segments, num]) => {
        return [[...segments].map(char => charMappings[char]).sort().join(''), num];
    }));
}

function statsFor(char, patterns) {
    const counts = counter(patterns.filter(pattern => pattern.includes(char)).map(set => set.length));
    return Object.entries(counts).sort().join(';');
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));