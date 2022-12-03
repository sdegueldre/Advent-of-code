import { assertEqual, counter, getInputs, product, zip, sum, logThrough } from "../../utils.js";
const { input } = getInputs(import.meta.url);

function diffLessThan(maxDiff, l1, l2) {
    let diff = 0;
    for (const [a, b] of zip(l1, l2)) {
        if (a !== b) {
            diff++;
        }
        if (diff >= maxDiff) {
            return false;
        }
    }
    return true;
}

function solution(input) {
    const lines = input.split("\n");
    // Urgh, this is O(n² * lineLength)
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            if (diffLessThan(2, lines[i], lines[j])) {
                return [...lines[i]].filter((c, i) => lines[j][i] === c).join("");
            }
        }
    }
}

const testInput = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`;
assertEqual(solution(testInput), "fgij");
console.log(solution(input)); // lnfqdscwjyteorambzuchrgpx
