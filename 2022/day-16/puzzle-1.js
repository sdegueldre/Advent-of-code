import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const lines = input.split("\n")
        .map(l => l.match(/Valve (.*) has flow rate=(.*); tunnels? leads? to valves? (.*)/).slice(1))
        .map(l => l);
    const graph = {};
    for (const [valve, rate, neighbors] of lines) {
        graph[valve] = {
            rate: +rate,
            neighbors: neighbors.split(", "),
        }
    }
    let maxPressureRelease = 0;
    const stack = [{ pos: "AA", timeLeft: 30, opened: new Set(), pressureRelease: 0 }];
    let fullyOpened = [];
    const visited = new Map();
    const visit = obj => {
        const keyObj = {...obj, opened: [...obj.opened].sort()};
        delete keyObj.pressureRelease;
        const key = JSON.stringify(keyObj);
        if (!visited.has(key) || visited.get(key) < obj.pressureRelease) {
            visited.set(key, obj.pressureRelease);
            stack.push(obj);
        }
    }
    let i = 0;
    while (stack.length) {
        if (i++ % 1000000 == 0) {
            console.log(i*1000000);
        }
        let { pos, timeLeft, opened, pressureRelease } = stack.pop();
        const nextNodes = graph[pos].neighbors;
        const flow = sum([...opened].map(n => graph[n].rate))
        pressureRelease += flow;
        timeLeft -= 1;
        if (timeLeft <= 0) {
            if (pressureRelease > maxPressureRelease) {
                maxPressureRelease = pressureRelease;
                if (maxPressureRelease === 1595) {
                    console.log({pos, opened});
                }
            }
            continue;
        }
        if (opened.size === lines.length) {
            fullyOpened.push({ pos, timeLeft, pressureRelease, opened });
            continue;
        }
        for (const node of nextNodes) {
            if (timeLeft > 1 && !opened.has(node) && graph[node].rate) {
                visit({
                    pos: node,
                    timeLeft: timeLeft - 1,
                    pressureRelease: pressureRelease + flow,
                    opened: new Set([...opened, node]),
                });
            }
            const path = [...opened].join(",");
            if (!path.includes(`${node},${pos}`)) {
                visit({
                    pos: node,
                    timeLeft,
                    pressureRelease,
                    opened,
                });
            }
        }
    }
    for (const {timeLeft, pressureRelease, opened} of fullyOpened) {
        const totalRelease = pressureRelease + sum([...opened].map(n => graph[n].rate)) * timeLeft;
        if (totalRelease > maxPressureRelease) {
            maxPressureRelease = totalRelease;
            if (maxPressureRelease === 1595) {
                console.log({opened});
            }
        }
        continue;
    }
    return maxPressureRelease;
}

assertEqual(solution(testInput), 1651);
console.log(solution(input)); // output
