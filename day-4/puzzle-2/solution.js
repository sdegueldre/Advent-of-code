const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n\n');

function solution(input) {
    let [nums, ...boards] = input.split('\n\n');
    nums = nums.split(',').map(num => +num);
    boards = boards.map(board => {
        return board.split('\n').map(row => {
            return row.match(/\d+/g).map(num => [+num, false]);
        });
    });
    for (const num of nums) {
        for (const board of boards) {
            for (const row of board) {
                for (const boardNum of row) {
                    if (boardNum[0] === num) {
                        boardNum[1] = true;
                    }
                }
            }
        }
        if (boards.length == 1 && isDone(boards[0])) {
            return score(boards[0]) * num;
        }
        boards = boards.filter(board => !isDone(board))
    }
}

function isDone(board) {
    const cols = zip(...board);
    return [...board, ...cols].some(line => line.every(([num, isSeen]) => isSeen));
}

function score(board) {
    return sum(board.flat().flatMap(([num, isSeen]) => isSeen ? [] : [num]));
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));