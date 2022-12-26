import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const dirs = [
    [ 1,  0], // R
    [ 0,  1], // D
    [-1,  0], // L
    [ 0, -1], // U
]
function solution(input) {
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
                // wrap around
                if ([" ", undefined].includes(grid[newPos[1]]?.[newPos[0]])) {
                    if (dir === 0) {
                        newPos[0] = 0;
                    } else if (dir === 1) {
                        newPos[1] = 0;
                    } else if (dir === 2) {
                        newPos[0] = grid[newPos[1]].length - 1;
                    } else if (dir === 3) {
                        newPos[1] = grid.length - 1;
                    }
                    // find real tile
                    while ([" ", undefined].includes(grid[newPos[1]]?.[newPos[0]])) {
                        newPos = pairSum(newPos, dirs[dir]);
                    }
                }
                if (grid[newPos[1]][newPos[0]] === "#") {
                    break;
                }
                pos = newPos;
            }
        }
    }
    return 1000 * (pos[1] + 1) + 4 * (pos[0] + 1) + dir;
}

assertEqual(solution(testInput), 6032);
console.log(solution(input)); // 80392
