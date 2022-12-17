import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, constrain, pairSum, directNeighbors, pairDiff } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const rocks = [
`####`,
` # 
###
 # `,
`  #
  #
###`,
`#
#
#
#`,
`##
##`,
].map(b => b.split("\n").map(l => l.split("").map(c => c === "#")).reverse());

const TRILLION = 1_000_000_000_000;
function solution(input) {
    const wind = input.split("");
    const tower = [];
    let rockType = 0;
    let rockPos = [2, tower.length + 3];
    let windIndex = 0;
    let setRocks = 0;
    let beforeFinish;
    let withoutFinisher;
    // dp[windIndex][rockType] = [towerHeight, setRocks]
    const dp = {}
    for (let i = 0; setRocks < TRILLION; i++) {
        const rock = rocks[rockType];

        if (i%2 === 0) {
            const dx = wind[windIndex] === "<" ? -1 : 1;
            windIndex = (windIndex + 1) % wind.length
            const newX = rockPos[0] + dx;
            if (!collides(rock, [newX, rockPos[1]], tower)) {
                rockPos[0] = newX;
            }
        } else {
            const newY = rockPos[1] - 1;
            if (collides(rock, [rockPos[0], newY], tower)) {
                for(const [y, row] of enumerate(rock)) {
                    for (const [x, piece] of enumerate(row)) {
                        const pos = pairSum([x, y], rockPos);
                        tower[pos[1]] = tower[pos[1]] || [];
                        tower[pos[1]][pos[0]] ||= piece;
                    }
                }
                rockType = (rockType + 1) % rocks.length;
                rockPos = [2, tower.length + 3];
                setRocks++;
                const shape = surfaceShape(tower);
                
                if(dp[windIndex]?.[shape]?.[rockType] && setRocks < 1000000) {
                    const [prefixHeight, prefixLength] = dp[windIndex][shape][rockType];
                    const cycleHeight = tower.length - prefixHeight;
                    const cycleLength = setRocks - prefixLength;
                    const nbCycles = Math.floor((TRILLION - prefixLength) / cycleLength);
                    const rocksAfterCycling = prefixLength + (nbCycles * cycleLength);
                    setRocks = rocksAfterCycling;
                    beforeFinish = tower.length;
                    withoutFinisher = prefixHeight + nbCycles * cycleHeight;
                    continue;
                } else {
                    dp[windIndex] = dp[windIndex] || {};
                    dp[windIndex][shape] = dp[windIndex][shape] || {};
                    dp[windIndex][shape][rockType] = [tower.length, setRocks];
                }
            } else {
                rockPos[1] = newY;
            }
        }
    }
    return tower.length - beforeFinish + withoutFinisher;
}

function collides(rock, pos, tower) {
    for(const [y, row] of enumerate(rock)) {
        for (const [x, piece] of enumerate(row)) {
            const piecePos = pairSum([x, y], pos);
            if (piecePos[0] < 0 || piecePos[0] > 6 || piecePos[1] < 0 || piece && tower[piecePos[1]]?.[piecePos[0]]) {
                return true;
            }
        }
    }
    return false;
}

function surfaceShape(grid) {
    const shape = [];
    for (let x = 0; x < 7; x++) {
        for (let y = grid.length - 1; true; y--) {
            if (grid[y]?.[x] || y < 0) {
                shape.push(grid.length - 1 - y);
                break;
            }
        }
    }
    return shape.join();
}

assertEqual(solution(testInput), 1514285714288);
console.log(solution(input)); // 1528323699442

function logShape(shape) {
    const points = shape.split(" ").map(p => p.split(",").map(n => +n));
    const [minX, maxX] = [Math.min(...points.map(p => p[0])), Math.max(...points.map(p => p[0]))];
    const width = maxX - minX;
    const [minY, maxY] = [Math.min(...points.map(p => p[1])), Math.max(...points.map(p => p[1]))];
    const height = maxY - minY;
    const grid = [];
    for (let y = 0; y <= height; y++) {
        grid[y] = [];
        for (let x = 0; x <= width; x++) {
            grid[y][x] = false;
        }
    }
    for(const [x, y] of points) {
        grid[y - minY][x - minX] = true;
    }
    logGrid(grid);
}

function logGrid(grid) {
    console.log(grid.map(l => [...Array(7)].map((_, i) => l[i] ? "#" : " ").join("")).reverse().join("\n"));
}