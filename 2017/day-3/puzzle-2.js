import { assertEqual, getInputs, zip, sum, cartesianProduct, shallowEqual } from "../../utils.js";
const { input } = getInputs(import.meta.url);

const dirs = [
    [ 1,  0],
    [ 0,  1],
    [-1,  0],
    [ 0, -1],
];
const neighbours = [...cartesianProduct([-1, 0, 1], [-1, 0, 1])].filter(item => !shallowEqual(item, [0, 0]));
function solution(input) {
    input = +input;
    let pos = [0, 0];
    const grid = [[1]];
    for (let dir = 0;; dir++) {
        for (let i = 1; i < ((dir + 2) / 2 | 0); i++) {
            const [x, y] = pos = zip(pos, dirs[dir%4]).map(sum);
            grid[x] = grid[x] || [];
            grid[x][y] = sum(neighbours.map(n => zip(n, pos).map(sum)).map(n => grid[n[0]]?.[n[1]] || 0));
            if (grid[x][y] > input) {
                return grid[x][y];
            }
            pos = [x, y];
        }
    }
}

const testInput = `9`
assertEqual(testInput.split("\n").map(solution), [10]);
console.log(solution(input)); // 279138
