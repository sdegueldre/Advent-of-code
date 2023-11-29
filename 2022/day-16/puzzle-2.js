import { assertEqual, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const key = set => [...set].sort().join();

export default function solution(input) {
    // dp[position][open][timeLeft]
    const dp = { "AA": { "AA": { 26: 0 } } };
    function fillDp() {
        const stack = [[new Set(["AA"]), 26, "AA", 0]];
        while (stack.length) {
            const [open, timeLeft, position] = stack.pop();
            const prevRelease = dp[position][key(open)][timeLeft]
            for (const neighbor in graph[position].distances) {
                if (open.has(neighbor)) continue;
                const newTime = timeLeft - graph[position].distances[neighbor];
                if (newTime > 0) {
                    const newOpen = new Set([...open, neighbor]);
                    const newOpenKey = key(newOpen);
                    stack.push([newOpen, newTime, neighbor, prevRelease + graph[neighbor].rate * newTime]);
                    dp[neighbor] = dp[neighbor] || {};
                    dp[neighbor][newOpenKey] = dp[neighbor][newOpenKey] || {};
                    const oldVal = dp[neighbor][newOpenKey][newTime];
                    dp[neighbor][newOpenKey][newTime] = Math.max(oldVal || 0, prevRelease + graph[neighbor].rate * newTime);
                }
            }
        }
    }

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

    let pathLengths = {};
    const shortestPath = (start, stop) => {
        if (start === stop) return 0;
        const key = [start, stop].sort().join();
        if (!(key in pathLengths)) {
            let time = 1;
            let queue = new Set([start]);
            let visited = new Set([start]);
            while (queue.size) {
                time++;
                let nextQueue = new Set();
                for (const node of queue) {
                    visited.add(node);
                    for (const n of graph[node].neighbors.filter(n => !visited.has(n))) {
                        nextQueue.add(n);
                    }
                }
                queue = nextQueue;
                if (queue.has(stop)) {
                    pathLengths[key] = time;
                    break;
                }
            }
            if (!(key in pathLengths)) {
                throw new Error(`No path from ${start} to ${stop}`);
            }
        }
        return pathLengths[key];
    }
    const nodesToLink = new Set(["AA"].concat(Object.keys(graph).filter(k => graph[k].rate > 0)));
    for (const node of nodesToLink) {
        graph[node].distances = {};
    }
    for (const a of nodesToLink) {
        for (const b of nodesToLink) {
            const dist = shortestPath(a, b);
            graph[b].distances[a] = dist;
            graph[a].distances[b] = dist;
        }
    }
    for (const node in graph) {
        if (!graph[node].rate && node !== "AA") {
            delete graph[node];
        } else {
            delete graph[node].neighbors;
            delete graph[node].distances[node];
        }
    }
    fillDp();
    const nodes = Object.keys(graph).slice(1).sort();
    console.log(nodes);
    let maxPressureRelease = 0;
    for (let i = 0; i < 3**nodes.length; i++) {
        if (i % 100000 === 0) {
            console.log(`${(i/3**nodes.length*100).toFixed(2)}%`);
        }
        const path = [...i.toString(3)].reverse().map(n => +n);
        const valves = [[], []];
        for (let i = 0; i < path.length; i++) {
            if (path[i] > 0) {
                valves[path[i] - 1].push(nodes[i]);
            }
        }
        const combinedRelease = sum(valves.map(path => {
            const open = "AA," + path.join(); // this path is in sorted order because of the sort on nodes
            let maxPathRelease = 0;
            for (const endPos of path) {
                const release = Math.max(...Object.values(dp[endPos][open] || {}));
                if (release > maxPathRelease) {
                    maxPathRelease = release;
                }
            }
            return maxPathRelease;
        }));
        if (combinedRelease > maxPressureRelease) {
            maxPressureRelease = combinedRelease;
        }
    }

    return maxPressureRelease;
}



assertEqual(solution(testInput), 1707); // JBC DHE
console.log(solution(input)); // output
