import { assertEqual, getInputs, sum, zip, getNums, extractLines, dist } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);


const dirMap = {
    "U": [1,0],
    "D": [-1,0],
    "R": [0,1],
    "L": [0,-1],
}
function solution(input) {
    const commands = extractLines(input, /(\w) (\d+)/, ["dir", "amount"]);
    const visited = new Set(["0,0"]);
    let hpos = [0, 0], tpos = [0, 0];
    for (const {dir, amount} of commands) {
        for(let i = 0; i < +amount; i++) {
            const prevPos = hpos;
            hpos = zip(hpos, dirMap[dir]).map(sum);
            if (dist(tpos, hpos) >= 1.5) {
                tpos = prevPos;
                visited.add(tpos.join());
            }
        }
    }
    return visited.size;
}

assertEqual(solution(testInput), 13);
console.log(solution(input)); // 6745
