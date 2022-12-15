import { assertEqual, getInputs, window, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const ropes = input.split("\n").map(l => l.split(" -> ").map(p => p.split(",").map(n => +n)));
    const grid = [];
    for (const rope of ropes) {
        for (let [[x, y], [a, b]] of window(rope, 2)) {
            if (y == b) {
                [x, a] = [x, a].sort((a, b) => a-b);
                for (let i = x; i <= a; i++) {
                    grid[i] = grid[i] || [];
                    grid[i][y] = "#";
                }
            } else if (x == a) {
                [y, b] = [y, b].sort((a, b) => a-b);
                grid[x] = grid[x] || [];
                for (let i = y; i <= b; i++) {
                    grid[x][i] = "#";
                }
            }
        }
    }
    const dirs = [
        [ 0, 1],
        [-1, 1],
        [ 1, 1],
    ]
    const maxHeight = Math.max(...grid.map(r => r.length).filter(Boolean))+1
    let sand = [500, 0];
    let totalSand = 0;
    while (grid[500][0] !== "o") {
        sand = [500, 0];
        while (true) {
            const nextPos = dirs.map(d => pairSum(d, sand)).find(([x, y]) => !grid[x]?.[y]);
            if (!nextPos || nextPos[1] >= maxHeight) {
                const [x, y] = sand;
                grid[x] = grid[x] || [];
                grid[x][y] = "o";
                totalSand++;
                break;
            }
            sand = nextPos;
        }
    }
    return totalSand;
}

assertEqual(solution(testInput), 93);
console.log(solution(input)); // 22499
