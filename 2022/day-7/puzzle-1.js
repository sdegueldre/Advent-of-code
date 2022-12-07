import { assertEqual, extractLines, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const lines = input.split("\n").reverse();
    const dirs = { "/" : {} };
    dirs["/"][".."] = dirs;
    let currentDir = dirs;
    while(lines.length){
        const [a, b, c] = lines.pop().split(" ");
        switch (a) {
            case "$":
                if (b === "cd") {
                    currentDir = currentDir[c];
                } // Ignore ls, assume anything not starting with $ is a file/dir
                break;
            case "dir":
                currentDir[b] = { "..": currentDir };
                break;
            default:
                currentDir[b] = +a;
        }
    }
    const sizes = dir => {
        const res = [0];
        for (const [key, value] of Object.entries(dir)) {
            if (key === "..") continue;
            if (typeof value === "object") {
                const subSizes = sizes(value);
                res[0] += subSizes[0];
                res.push(...subSizes);
            } else {
                res[0] += value;
            }
        }
        return res;
    }
    return sum(sizes(dirs).filter(s => s <= 100000))
}

assertEqual(solution(testInput), 95437);
console.log(solution(input)); // 1723892
