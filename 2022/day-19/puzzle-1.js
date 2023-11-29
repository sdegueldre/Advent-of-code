import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, getNums, pairSum, pairDiff } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const blueprints = input.split("\n").map(l => getNums(l));
    let scores = blueprints.map(evaluateBluePrint);
    return Math.max(...scores);
}

function evaluateBluePrint([oreRobot, clayRobot, obRobotOre, obRobotClay, geoRobotOre, geoRobotObsidian]) {
    // ore, clay, obsidian, geode
    const materials = [0,0,0,0];
    const robots = [1,0,0,0];
    const recipes = [
        [oreRobot, 0, 0, 0],
        [clayRobot, 0, 0, 0],
        [obRobotOre, obRobotClay, 0, 0],
        [geoRobotOre, 0, geoRobotObsidian, 0],
    ];
    const timeLeft = 10;
    const stack = [[materials, robots, timeLeft]];
    let maxGeodes = 0;
    while (stack.length) {
        let [materials, robots, timeLeft] = stack.pop();
        if (materials[3] > maxGeodes) {
            maxGeodes = materials[3];
        }
        if (!timeLeft) continue;
        materials = pairSum(robots, materials);
        for(const build of getPossibleBuilds(materials, recipes)) {
            const newMats = pairDiff(materials, build);
            const newRobots = pairSum(robots, build);
            stack.push([newMats, newRobots, timeLeft - 1]);
        }
    }
    return maxGeodes;
}

function getPossibleBuilds(materials, recipes) {
    const builds = [[0, 0, 0, 0]];
    for (const [i, costs] of enumerate(recipes)) {
        const matsAfter = zip(materials, costs).map(([a, b]) => a - b);
        if (matsAfter.every(qty => qty >= 0)) {
            const build = [0, 0, 0, 0].map((_, j) => j === i ? 1 : 0);
            builds.push(build);
        }
    }
    return builds;
}

// assertEqual(solution(testInput), 33);
// console.log(solution(input)); // 1009

import { part1 } from "./randos solution.js";
console.log(part1(input));
