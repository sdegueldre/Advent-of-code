import { assertEqual, getInputs, zip, product } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function getScore(i, j, grid) {
    const height = grid[i][j];
    const scores = [];
    let score = 0;
    // down
    for (let y = i + 1; y < grid.length; y++) {
        score++;
        if (grid[y][j] >= height) break;
    }
    scores.push(score);
    score = 0;
    //up
    for (let y = i - 1; y >= 0; y--) {
        score++;
        if (grid[y][j] >= height) break;
    }
    scores.push(score);
    // right
    score = 0;
    for (let x = j + 1; x < grid[i].length; x++) {
        score++;
        if (grid[i][x] >= height) break;
    }
    scores.push(score);
    score = 0;
    // left
    for (let x = j - 1; x >= 0; x--) {
        score++;
        if (grid[i][x] >= height) break;
    }
    scores.push(score);
    return product(scores);
}

function solution(input) {
    let grid = input.split("\n").map(l => l.split("").map(n => +n));
    let bestVisibility = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const visibility = getScore(i, j, grid);
            if (visibility > bestVisibility) {
                bestVisibility = visibility;
            }
        }
    }
    return bestVisibility;
}

assertEqual(solution(testInput), 8);
console.log(solution(input)); // 595080
