import { assertEqual, getInputs, zip, sum, pairWise, sortNums } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    const [wireA, wireB] = input.split("\n").map(toRanges);
    let minDist = Math.min();
    let distA = 0;
    for (const a of wireA) {
        let distB = 0;
        for (const b of wireB) {
            if ("x" in a && "y" in b) {
                const crossing = cross(b, a);
                if (crossing) {
                    const [dx, dy] = crossing;
                    const dist = distA + distB + dx + dy;
                    if (dist && dist < minDist) {
                        minDist = dist;
                    }
                }
            } else if ("x" in b && "y" in a) {
                const crossing = cross(a, b);
                if (crossing) {
                    const [dx, dy] = crossing;
                    const dist = distA + distB + dx + dy;
                    if (dist && dist < minDist) {
                        minDist = dist;
                    }
                }
            }
            distB += b.max - b.min;
        }
        distA += a.max - a.min;
    }
    return minDist;
}

const isIn = (min, max) => n => n >= min && n <= max;
function cross({ y, min: minX, max: maxX, dir: hDir }, { x, min: minY, max: maxY, dir: vDir }) {
    if(!isIn(minY, maxY)(y) || !isIn(minX, maxX)(x)) {
        return false;
    }
    const dx = hDir === "L" ? maxX - x : x - minX;
    const dy = vDir === "D" ? maxY - y : y - minY;
    return [dx, dy];
}

const dirs = {
    U: [ 0,  1],
    D: [ 0, -1],
    R: [ 1,  0],
    L: [-1,  0],
}
function toRanges(wire) {
    let pos = [0, 0];
    const ranges = [];
    for(const instruction of wire.split(",")) {
        const [dir, dist] = [instruction[0], +instruction.slice(1)];
        const offset = dirs[dir].map(n => n * dist);
        const newPos = zip(pos, offset).map(sum);
        if (offset[0]) {
            const range = sortNums([pos[0], newPos[0]]);
            ranges.push({ min: range[0], max: range[1], y: pos[1], dir });
        } else {
            const range = sortNums([pos[1], newPos[1]]);
            ranges.push({ min: range[0], max: range[1], x: pos[0], dir });
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
assertEqual(testInput.split("\n\n").map(solution), [30, 610, 410]);
console.log(solution(input)); // 43848
