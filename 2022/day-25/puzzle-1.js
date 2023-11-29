import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const total = sum(input.split("\n").map(fromSnafu));
    return toSnafu(total);
}

const weights = {
    "=": -2,
    "-": -1,
    "0":  0,
    "1":  1,
    "2":  2,
}
function fromSnafu(num) {
    return num.split("").reverse().reduce((a, d, i) => a + 5**i * weights[d], 0);
}

const toDigit = {
     "-2": "=",
     "-1": "-",
     "0": "0",
     "1": "1",
     "2": "2",
}
function toSnafu(num) {
    const digits = [2];
    while (fromSnafu(digits.join("")) < num) digits.push(2);
    for (let i = 0; i < digits.length; i++) {
        while(digits[i] > -2) {
            digits[i]--;
            if (fromSnafu(digits.map(d => toDigit[d]).join("")) < num) {
                digits[i]++;
                break;
            }
        }
    }
    return digits.map(d => toDigit[d]).join("")
}

assertEqual(solution(testInput), "2=-1=0");
console.log(solution(input)); // output
