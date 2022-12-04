import { assertEqual, getInputs, logThrough, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const byNums = fieldNames => (a, b) => {
    for (const fieldName of fieldNames) {
        const diff = a[fieldName] - b[fieldName];
        if (diff) {
            return diff;
        }
    }
    return 0;
};
function solution(input) {
    const entries = input.split("\n")
        .map(l => l.match(/^\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.*)$/))
        .map(([match, year, month, day, hour, minute, rest]) => ({
            year: +year,
            month: +month,
            day: +day,
            hour: +hour,
            minute: +minute,
            rest
        }))
        .sort(byNums(["year", "month", "day", "hour", "minute"]))
        .reverse()

    const guards = [];
    while (entries.length) {
        const guardId = entries.pop().rest.match(/#(\d+)/)[1];
        guards[guardId] = guards[guardId] || Array(60).fill(0);
        while (entries.length && !entries[entries.length - 1].rest.startsWith("Guard")) {
            const { minute: start } = entries.pop();
            const { minute: stop } = entries.pop();
            for (let i = start; i < stop; i++) {
                guards[guardId][i] += 1;
            }
        }
    }
    const sleepiest = guards.reduce((sleepiest, current, id) => {
        const asleep = sum(current);
        return asleep > sleepiest.asleep ? { id, asleep, minutes: current } : sleepiest;
    }, { asleep: 0 });
    const mostTimesAsleep = Math.max(...sleepiest.minutes);
    const bestMinute = sleepiest.minutes.indexOf(mostTimesAsleep);
    return bestMinute * sleepiest.id;
}

assertEqual(solution(testInput), 240);
console.log(solution(input)); // 12504
