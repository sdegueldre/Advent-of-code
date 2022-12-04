import { assertEqual, counter, getInputs, logThrough, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    return sum(
        input.split("\n")
            .map(l => l.match(/(.*)\[(.*)\]/))
            .map(([_, nameId, checksum]) => {
                const parts = nameId.split("-");
                return {
                    id: +parts.pop(),
                    name: parts.join(""),
                    checksum,
                }
            })
            .map(({ id, name, checksum }) => {
                const counts = counter(name);
                return Object.entries(counts)
                    .sort(([charA, countA], [charB, countB]) => countB - countA || charA.localeCompare(charB))
                    .slice(0, 5)
                    .map(([char]) => char)
                    .join("") === checksum ? id : 0;

            })
    );
}

assertEqual(solution(testInput), 1514);
console.log(solution(input)); // 137896
