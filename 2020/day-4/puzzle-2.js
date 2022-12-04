import { assertEqual, getInputs } from "../../utils.js";
const { input } = getInputs(import.meta.url);

const inRange = (min, max) => n => n >= min && n <= max;
const fields = {
    "byr": inRange(1920, 2002),
    "iyr": inRange(2010, 2020),
    "eyr": inRange(2020, 2030),
    "hgt": h => h.endsWith("cm") ? inRange(150, 193)(parseInt(h)) : inRange(59, 76)(parseInt(h)),
    "hcl": c => c.match(/^#[0-9a-f]{6}$/),
    "ecl": c => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(c),
    "pid": id => id.match(/^[0-9]{9}$/),
    // "cid",
}
function solution(input) {
    return input.split("\n\n")
        .map(passport => Object.fromEntries(passport.split(/\s/).map(fieldDesc => fieldDesc.split(":"))))
        .filter(pass => {
            for(const [fieldName, validator] of Object.entries(fields)) {
                if (!(fieldName in pass) || !validator(pass[fieldName])) {
                    return false;
                }
            }
            return true;
        })
        .length;
}

const testInput = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;
assertEqual(solution(testInput), 4);
console.log(solution(input)); // output
