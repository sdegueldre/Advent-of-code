import { assertEqual, getInputs, getNums, chunk, manhattan, mergeRanges, deepEqual } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input, maxCoord = 20) {
    const sensors = input.split("\n").map(l => chunk(getNums(l), 2));
    for (let y = 0; y <= maxCoord; y++) {
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
        if (!deepEqual(mergeRanges([...merged, [0, maxCoord]]), merged)) {
            for (const [min, max] of merged) {
                if (min - 1 >= 0) {
                    return (min - 1) * 4_000_000 + y;
                } else if (max + 1 <= maxCoord) {
                    return (max + 1) * 4_000_000 + y;
                }
            }
        }
    }
}

assertEqual(solution(testInput), 56000011);
console.log(solution(input, 4000_000)); // 13784551204480