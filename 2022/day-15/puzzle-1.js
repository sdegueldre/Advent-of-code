import { assertEqual, getInputs, mergeRanges, getNums, chunk, manhattan, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input, y = 10) {
    const sensors = input.split("\n").map(l => chunk(getNums(l), 2));
    let ranges = [];
    for (const [sensor, beacon] of sensors) {
        const radius = manhattan(sensor, beacon);
        const spanAtTarget = radius - Math.abs(sensor[1] - y);
        const [min, max] = [sensor[0] - spanAtTarget, sensor[0] + spanAtTarget];
        if (min <= max) {
            ranges.push([min, max]);
        }
    }
    const merged = mergeRanges(ranges);
    const beaconsOnRow = new Set();
    for (const [_, beacon] of sensors) {
        if (beacon[1] === y) {
            beaconsOnRow.add(beacon[0]);
        }
    }
    return sum(merged.map(([min, max]) => max - min + 1)) - beaconsOnRow.size;
}

assertEqual(solution(testInput), 26);
console.log(solution(input, 2000_000)); // 4502208
