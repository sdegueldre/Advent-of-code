import { getInputs, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const dirs = [
    [1, 0], // R
    [0, 1], // D
    [-1, 0], // L
    [0, -1], // U
]
export default function solution(input) {
    let [lines, path] = input.split("\n\n");
    const grid = lines = lines.split("\n").map(l => [...l]);
    let pos = [grid[0].indexOf("."), 0];
    let dir = 0;
    path = path.match(/\d+|R|L/g);
    for (const item of path) {
        if ("RL".includes(item)) {
            dir += item === "R" ? 1 : 3;
            dir %= 4;
        } else {
            const amount = +item;
            for (let i = 0; i < amount; i++) {
                let newPos = pairSum(pos, dirs[dir]);
                let newDir = dir;
                // wrap around
                if ([" ", undefined].includes(grid[newPos[1]]?.[newPos[0]])) {
                    [newPos, newDir] = wrap(newPos, newDir);
                }
                if (grid[newPos[1]][newPos[0]] === "#") {
                    break;
                }
                [pos, dir] = [newPos, newDir];
            }
        }
    }
    return 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dir;
}

// Index of each direction in dirs
const [R, D, L, U] = [0, 1, 2, 3];
//    [A][B]
//    [C]
// [D][E]
// [F]
// Really hate that this is hardcoded but doing it properly seems like a lot of work.
function wrap([x, y], dir) {
    if (dir === 0) {
        // Wrap on the right:
        if (y < 50) {
            return [[99, 149 - y], L];
        } else if (y < 100) {
            return [[y + 50, 49], U];
        } else if (y < 150) {
            return [[149, 149 - y], L];
        } else if (y < 200) {
            return [[y - 100, 149], U];
        }
    } else if (dir === 2) {
        // Wrap on the left:
        if (y < 50) {
            return [[0, 149 - y], R];
        } else if (y < 100) {
            return [[y - 50, 100], D];
        } else if (y < 150) {
            return [[50, 149 - y], R];
        } else if (y < 200) {
            return [[y - 100, 0], D];
        }
    } else if (dir === 1) {
        // Wrap on bottom:
        if (x < 50) {
            return [[x + 100, 0], D];
        } else if (x < 100) {
            return [[49, x + 100], L];
        } else if (x < 150) {
            return [[99, x - 50], L];
        }
    } else {
        // Wrap on the top:
        if (x < 50) {
            return [[50, x + 50], R];
        } else if (x < 100) {
            return [[0, x + 100], R];
        } else if (x < 150) {
            return [[x - 100, 199], U];
        }
    }
}
// Doesn't work on test input because the wrapping rules are different
// since they're different layouts.
// assertEqual(solution(testInput, 50), 5031);
console.log(solution(input)); // 19534
