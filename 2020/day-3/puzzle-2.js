import { assertEqual, getInputs, zip, sum, product } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const trees = input.split("\n").map(l => [...l].map(c => c === "#"));
    const width = trees[0].length;
    const slopes = [
        [1, 1],
        [1, 3],
        [1, 5],
        [1, 7],
        [2, 1],
    ];
    return product(slopes.map(slope => {
        let pos = [0, 0];
        let collisions = 0;
        while (pos[0] < trees.length) {
            collisions += trees[pos[0]][pos[1] % width];
            pos = zip(pos, slope).map(sum);
        }
        return collisions
    }));
}

assertEqual(solution(testInput), 336);
console.log(solution(input)); // 270
