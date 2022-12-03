import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const claims = input.split("\n")
        .map(l => l.match(/#\d+ @ (\d+),(\d+): (\d+)x(\d+)/))
        .map(([_, ...claim]) => claim.map(n => +n))
        .map(([x, y, w, h]) => ({x, y, w, h}));
    const grid = [];
    for (const {x, y, w, h} of claims) {
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                grid[j] = grid[j] || [];
                grid[j][i] = (grid[j][i] || 0) + 1;
            }
        }
    }
    // console.log(grid);
    return grid.flat().filter(el => el > 1).length;
}

assertEqual(solution(testInput), 4);
console.log(solution(input)); // 100261
