import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid, shadowGrid, enumGrid, pairDiff, inGrid, pairSum, logGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 34]];

const addAntinodes = (pos, dir, antinodes) => {
    let [x, y] = pos;
    while (inGrid(y, x, antinodes)) {
        antinodes[y][x] = 1;
        [x, y] = pairSum([x, y], dir);
    }
    [x, y] = pos;
    while (inGrid(y, x, antinodes)) {
        antinodes[y][x] = 1;
        [x, y] = pairDiff([x, y], dir);
    }
}

export function solve(input) {
    const grid = toGrid(input);
    const antinodes = shadowGrid(grid);
    const antennas = {};
    for (const {x, y, cell} of enumGrid(grid)) {
        if (cell === ".") continue;
        antennas[cell] ||= [];
        for (const other of antennas[cell]) {
            addAntinodes([x, y], pairDiff(other, [x, y]), antinodes);
        }
        antennas[cell].push([x, y]);
    }
    return sum(antinodes.flat());
}
export const solution = 1015;
