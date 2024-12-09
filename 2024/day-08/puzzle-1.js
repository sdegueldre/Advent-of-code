import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate, toGrid, shadowGrid, enumGrid, pairDiff, inGrid, pairSum, logGrid } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-1.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 14]];

export function solve(input) {
    const grid = toGrid(input);
    const antinodes = shadowGrid(grid);
    const antennas = {};
    for (const {x, y, cell} of enumGrid(grid)) {
        if (cell === ".") continue;
        antennas[cell] ||= [];
        for (const other of antennas[cell]) {
            const diff = pairDiff(other, [x, y]);
            const an1 = pairSum(other, diff);
            const an2 = pairDiff([x, y], diff);
            if (inGrid(an1[1], an1[0], antinodes)) {
                antinodes[an1[1]][an1[0]] = 1;
            }
            if (inGrid(an2[1], an2[0], antinodes)) {
                antinodes[an2[1]][an2[0]] = 1;
            }
        }
        antennas[cell].push([x, y]);
    }
    return sum(antinodes.flat());
}
export const solution = 291;
