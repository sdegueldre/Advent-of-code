import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, window, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const ropes = input.split("\n").map(l => l.split(" -> ").map(p => p.split(",").map(n => +n)));
    const grid = [];
    console.log(ropes)
    for (const rope of ropes) {
        for (let [[x, y], [a, b]] of window(rope, 2)) {
            console.log({x,y, a, b})
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
    let sand = [500, 0];
    let totalSand = 0;
    while (sand[1] < grid.length) {
        sand = [500, 0];
        while (sand[1] < grid.length) {
            const nextPos = dirs.map(d => pairSum(d, sand)).find(([x, y]) => !grid[x]?.[y]);
            if (!nextPos) {
                const [x, y] = sand;
                grid[x][y] = "o";
                totalSand++;
                break;
            }
            sand = nextPos;
        }
    }
    return totalSand;
}

assertEqual(solution(testInput), 24);
console.log(solution(input)); // 774
