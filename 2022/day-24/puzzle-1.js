import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, pairSum, mod, Queue, neighbors, directNeighbors, shallowEqual } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const grid = input.split("\n").slice(1, -1)
        .map(l => l.split("").slice(1, -1).map(i => {
            switch (i) {
                case "^": return [[ 0, -1]];
                case "v": return [[ 0,  1]];
                case ">": return [[ 1,  0]];
                case "<": return [[-1,  0]];
                default: return [];
            }
        }));
    const gridCache = [grid];
    const gridAt = step => {
        step = step % (grid.length * grid[0].length);
        if (!(step in gridCache)) {
            const prevStep = gridAt(step - 1);
            const newGrid = prevStep.map(row => row.map(i => []));
            for (const [y, row] of enumerate(prevStep)) {
                for (const [x, gusts] of enumerate(row)) {
                    for (const gust of gusts) {
                        const newPos = pairSum([x, y], gust);
                        newPos[0] = mod(newPos[0], grid[0].length);
                        newPos[1] = mod(newPos[1], grid.length);
                        newGrid[newPos[1]][newPos[0]].push(gust);
                    }
                }
            }
            gridCache[step] = newGrid;
        }
        return gridCache[step];
    }
    const target = [grid[0].length - 1, grid.length];
    const q = new Queue([{ pos: [0, -1], step: 0 }]);
    const seen = new Set();
    while (!q.empty) {
        const { pos, step } = q.dequeue();
        let grid = gridAt(step);
        const key = [...pos, step % (grid.length * grid[0].length)].join();
        if (seen.has(key)) continue;
        seen.add(key);
        grid = gridAt(step + 1);
        for (const [x, y] of directNeighbors.map(n => pairSum(pos, n))) {
            if (shallowEqual([x, y], target)) {
                return step + 1;
            }
            if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                continue;
            }
            if (!grid[y][x].length) {
                q.enqueue({pos: [x, y], step: step + 1});
            }
        }
        // stand still
        const [x, y] = pos;
        if (y === -1 || !grid[y][x].length) {
            q.enqueue({pos, step: step + 1});
        }
        console.log(q.size);
        // logGrid(grid);
        // console.log(q.asArray());
    }
    return "Not found";
}

function logGrid(grid) {
    console.log(grid.map(row => row.map(gusts => {
        if (!gusts.length) return ".";
        if (gusts.length > 1) return gusts.length;
        switch (gusts[0].join()) {
            case "1,0": return ">";
            case "-1,0": return "<";
            case "0,1": return "v";
            case "0,-1": return "^";
        }
    }).join("")).join("\n"));
    console.log("-".repeat(grid[0].length));
}

assertEqual(solution(testInput), 18);
console.log(solution(input)); // output
