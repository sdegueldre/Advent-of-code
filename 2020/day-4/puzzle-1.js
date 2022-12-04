import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const fields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    // "cid",
]
function solution(input) {
    return input.split("\n\n")
        .map(passport => Object.fromEntries(passport.split(/\s/).map(fieldDesc => fieldDesc.split(":"))))
        .filter(pass => fields.every(f => f in pass))
        .length;
}

assertEqual(solution(testInput), 2);
console.log(solution(input)); // output
