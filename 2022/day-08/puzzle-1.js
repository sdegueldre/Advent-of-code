import { assertEqual, getInputs, zip } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function markVisible(row) {
    let height = -1;
    for(let i = 0; i < row.length; i++) {
        const currentHeight = row[i].h;
        if (currentHeight > height) {
            height = currentHeight;
            row[i].visible = true;
        }
    }
    height = -1;
    for(let i = row.length - 1; i >= 0; i--) {
        const currentHeight = row[i].h;
        if (currentHeight > height) {
            height = currentHeight;
            row[i].visible = true;
        }
    }
}

export default function solution(input) {
    let grid = input.split("\n").map(l => l.split("").map(n => ({h:+n, visible: false})));
    for (const row of grid) {
        markVisible(row);
    }
    grid = zip(...grid);
    for (const row of grid) {
        markVisible(row);
    }
    return grid.flat().filter(({visible}) => visible).length;
}

assertEqual(solution(testInput), 21);
console.log(solution(input)); // 1543
