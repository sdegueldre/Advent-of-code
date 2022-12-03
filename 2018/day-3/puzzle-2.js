import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const claims = input.split("\n")
        .map(l => l.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/))
        .map(([_, ...claim]) => claim.map(n => +n))
        .map(([id, x, y, w, h]) => ({id, x, y, w, h}));
    const grid = [];
    const ids = new Set();
    for (const {id, x, y, w, h} of claims) {
        ids.add(id);
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                grid[j] = grid[j] || [];
                grid[j][i] = grid[j][i] || [];
                grid[j][i].push(id);
            }
        }
    }
    grid.flat()
        .filter(ids => ids.length > 1)
        .forEach(overlap => overlap.forEach(id => ids.delete(id)));
    return [...ids][0];
}

assertEqual(solution(testInput), 3);
console.log(solution(input)); // 251
