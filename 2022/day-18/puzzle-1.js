import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, getNums, neighbors3d } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const lines = input.split("\n");
    const cubes =  lines.map(l => getNums(l));
    const space = [];
    let visible = 0;
    for (const [x, y, z] of cubes) {
        visible += 6;
        space[x] = space[x] || [];
        space[x][y] = space[x][y] || [];
        space[x][y][z] = true;
        for (const [a, b, c] of neighbors3d.map(n => zip(n, [x,y,z]).map(sum))) {
            if (space[a]?.[b]?.[c]) {
                visible-=2;
            }
        }
    }
    return visible;
}

assertEqual(solution(testInput), 64);
console.log(solution(input)); // 4400
