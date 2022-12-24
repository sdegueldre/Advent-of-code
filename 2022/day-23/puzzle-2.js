import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, neighbors, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const dirNeighbors = [
    [-1, -1], // NW
    [ 0, -1], // N
    [ 1, -1],
    [ 1,  0], // E
    [ 1,  1], 
    [ 0,  1], // S
    [-1,  1],
    [-1,  0], // W
    [-1, -1],
]
function solution(input) {
    const elves = input.split("\n").map(l => l.split(""));
    const grid = [];
    for(const [y, row] of enumerate(elves)) {
        for(const [x, tile] of enumerate(row)) {
            if (tile === "#") {
                grid[y] = grid[y] || [];
                grid[y][x] = true;
            }
        }
    }
    let dirs = [1,5,7,3];
    for (let step = 0; step < 1000; step++) {
        const movementsThisStep = [];
        const targets = new Map();
        for (let y in grid) {
            y = +y;
            for (let x in grid[y]) {
                x = +x;
                if (neighbors.map(n => pairSum(n, [x, y])).some(([x, y]) => grid[y]?.[x])) {
                    for (const dir of dirs) {
                        const candidates = dirNeighbors.slice(dir-1, dir+2);
                        if (candidates.map(c => pairSum(c, [x, y])).every(([x, y]) => !grid[y]?.[x])) {
                            const target = pairSum([x, y], dirNeighbors[dir]);
                            movementsThisStep[x] = movementsThisStep[x] || [];
                            movementsThisStep[x][y] = target;
                            const key = target.join();
                            targets.set(key, (targets.get(key) || 0) + 1);
                            break;
                        }
                    }
                }
            }
        }
        if (!Object.keys(movementsThisStep).length){
            console.log("DONE", step + 1);
            logGrid(grid);
            return step + 1;
        };
        for (let x in movementsThisStep) {
            x = +x;
            for (let y in movementsThisStep[x]) {
                y = +y;
                const target = movementsThisStep[x][y];
                if (targets.get(target.join()) < 2) {
                    delete grid[y][x];
                    grid[target[1]] = grid[target[1]] || [];
                    grid[target[1]][target[0]] = true;
                }
            }
        }
        dirs.push(dirs.shift());
        // console.log("===================")
    }
    logGrid(grid);
}

function logGrid(grid) {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let y in grid) {
        y = +y
        for (let x in grid[y]) {
            x = +x;
            [minX, minY, maxX, maxY] = [Math.min(minX, x), Math.min(minY, y), Math.max(maxX, x), Math.max(maxY, y)];
        }
    }
    const toLog = Array(maxY - minY + 1).fill().map(_ => Array(maxX - minX + 1).fill("."));
    console.log({maxY, minY});
    for (let y in grid) {
        const y_ = y
        y = +y - minY;
        for (let x in grid[y_]) {
            x = +x - minX;
            toLog[y][x] = "#";
        }
    }
    console.log(toLog.map(l => l.join("")).join("\n"));
}

assertEqual(solution(testInput), 20);
console.log(solution(input)); // 4116
