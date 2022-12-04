import { assertEqual, getInputs, zip, sum, pairWise, sortNums } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    const [a, b] = input.split("\n").map(toRanges);
    let minDist = Math.min();
    for (const h of a.horizontal) {
        for (const v of b.vertical) {
            const dist = cross(h, v);
            if (dist && dist < minDist) {
                minDist = dist;
            }
        }
    }
    for (const h of b.horizontal) {
        for (const v of a.vertical) {
            const dist = cross(h, v);
            if (dist && dist < minDist) {
                minDist = dist;
            }
        }
    }
    return minDist;
}

const isIn = (min, max) => n => n >= min && n <= max;
function cross({ y, min: minX, max: maxX }, { x, min: minY, max: maxY }) {
    return isIn(minY, maxY)(y) && isIn(minX, maxX)(x) && (Math.abs(x) + Math.abs(y));
}

const dirs = {
    U: [ 0,  1],
    D: [ 0, -1],
    R: [ 1,  0],
    L: [-1,  0],
}
function toRanges(wire) {
    let pos = [0, 0];
    const ranges = {
        vertical: [],
        horizontal: [],
    };
    for(const instruction of wire.split(",")) {
        const [dir, dist] = [instruction[0], +instruction.slice(1)];
        const offset = dirs[dir].map(n => n * dist);
        const newPos = zip(pos, offset).map(sum);
        if (offset[0]) {
            const range = sortNums([pos[0], newPos[0]]);
            ranges.horizontal.push({ min: range[0], max: range[1], y: pos[1] });
        } else {
            const range = sortNums([pos[1], newPos[1]]);
            ranges.vertical.push({ min: range[0], max: range[1], x: pos[0] });
        }
        pos = newPos;
    }
    return ranges;
}

const testInput = `R8,U5,L5,D3
U7,R6,D4,L4

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83

R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`
assertEqual(testInput.split("\n\n").map(solution), [6, 159, 135]);
console.log(solution(input)); // 352
