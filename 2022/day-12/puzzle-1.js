import { assertEqual, getInputs, shallowEqual, directNeighbors, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    let start, end
    const heights = input.split("\n")
        .map((l, x) => [...l].map((c, y) => {
            if (c === c.toLowerCase()) {
                return c.charCodeAt(0) - 97;
            }
            if (c === "S") {
                start = [x, y];
                return 0;
            }
            end = [x, y];
            return 25;
        }));
    const reachable = ([x, y]) => directNeighbors.map(pairSum([x, y]))
        .filter(([a, b]) => heights[a]?.[b] - heights[x][y] <= 1);
    let toVisit = [start];
    let visited = new Set(start.join());
    for (let steps = 1; toVisit.length; steps++) {
        toVisit = toVisit.flatMap(reachable).filter(pos => {
            if (visited.has(pos.join())) {
                return false;
            }
            visited.add(pos.join());
            return true;
        });
        if (toVisit.some(pos => shallowEqual(pos, end))) {
            return steps;
        }
    }
}

assertEqual(solution(testInput), 31);
console.log(solution(input)); // 481
