import { assertEqual, counter, getInputs, logThrough, sum } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function solution(input) {
    return input.split("\n")
        .map(l => l.match(/(.*)\[(.*)\]/))
        .map(([_, nameId, checksum]) => {
            const parts = nameId.split("-");
            return {
                id: +parts.pop(),
                name: parts.join("-"),
                checksum,
            }
        })
        .filter(({ name, checksum }) => {
            const counts = counter([...name].filter(c => c !== "-"));
            return Object.entries(counts)
                .sort(([charA, countA], [charB, countB]) => countB - countA || charA.localeCompare(charB))
                .slice(0, 5)
                .map(([char]) => char)
                .join("") === checksum;

        })
        .map(({ id, name }) => ({
            id,
            name: [...name].map(c => c === "-" ? " " : String.fromCharCode((c.charCodeAt(0) - 97 + id) % 26 + 97)).join(""),
        }))
        .find(({ name }) => name.includes("north") && name.includes("pole") && name.includes("object"))
        .id
}

const testInput = `northpole-object-storage-0[oetra]
northpole-object-storage-10[oetra]
northpole-object-storage-15[north]`;

assertEqual(solution(testInput), 0);
console.log(solution(input)); // 501
