import { assertEqual, extractLines, getInputs, sum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
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
    const dirSizes = sizes(dirs);
    const available = 70_000_000 - dirSizes[0];
    const toFree = 30_000_000 - available;
    return dirSizes.sort((a, b) => a - b).find(dirSize => dirSize >= toFree);
}

assertEqual(solution(testInput), 24933642);
console.log(solution(input)); // 8474158
