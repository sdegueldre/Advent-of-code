import { assertEqual, getInputs, pairSum, directNeighbors } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    let end;
    const heights = input.split("\n")
        .map((l, x) => [...l].map((c, y) => {
            if (c === c.toLowerCase()) {
                return c.charCodeAt(0) - 97;
            }
            if (c === "S") {
                return 0;
            }
            end = [x, y];
            return 25;
        }));
    const reachable = ([x, y]) => directNeighbors.map(pairSum([x, y]))
            .filter(([a, b]) => heights[a]?.[b] - heights[x][y] >= -1);
    let toVisit = [end];
    let visited = new Set([end.join()]);
    for (let steps = 1; toVisit.length; steps++) {
        toVisit = toVisit.flatMap(reachable).filter(pos => {
            if (visited.has(pos.join())) {
                return false;
            }
            visited.add(pos.join());
            return true;
        });
        if (toVisit.some(([x, y]) => heights[x][y] === 0)) {
            return steps;
        }
    }
}

assertEqual(solution(testInput), 29);
console.log(solution(input)); // 480
