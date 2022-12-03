import { assertEqual, getInputs, zip } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    const [a, b] = input.split("\n");
    
}

const dirs = {
    U: [ 0,  1],
    D: [ 0, -1],
    R: [ 1,  0],
    L: [-1,  0],
}
function toVecs(wire) {
    const pos = [0, 0];
    const vecs = [];
    for(const instruction of wire.split(",")) {
        const [dir, dist] = [instruction[0], +instruction.slice(1)];
        vecs.push({
            origin: pos,
            magnitude: dirs[dir].map(n => n * dist),
        });
    }
}

const testInput = `R8,U5,L5,D3
U7,R6,D4,L4

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83

R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`
assertEqual(testInput.split("\n\n").map(solution), [6, 159, 135]);
console.log(solution(input)); // output
