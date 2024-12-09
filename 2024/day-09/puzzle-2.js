import { readFileSync } from "fs";
import { assertEqual, sum, zip, product, logThrough, enumerate } from "../../utils.js";

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 2858]];

const logIf = (i, ...toLog) => {
    if (i === 4) {
        console.log(...toLog);
    }
}
export function solve(input) {
    const disk = [...input].map((n, i) => ({id: i >> 1, size:+n, type: i%2 ? "blank" : "file"}));
    for (let i = disk.at(-1).id; i > 0; i--) {
        const idxToMove = disk.findIndex(f => f.id === i && f.type === "file");
        const file = {...disk[idxToMove]};
        for (const [spaceIdx, space] of disk.entries()) {
            if (space.type === "file" && space.id === i) break;
            if (space.type === "blank" && space.size >= file.size) {
                disk[idxToMove].type = "blank";
                if (disk[idxToMove + 1]?.type === "blank") {
                    disk[idxToMove].size += disk[idxToMove + 1].size;
                    disk.splice(idxToMove + 1, 1);
                }
                if (disk[idxToMove - 1]?.type === "blank") {
                    disk[idxToMove - 1].size += disk[idxToMove].size;
                    disk.splice(idxToMove, 1);
                }
                disk.splice(spaceIdx, 0, file);
                space.size -= file.size;
                break;
            }
        }
    }
    const resultArr = [];
    for (const {type, size, id} of disk) {
        resultArr.push(...Array(size).fill(type === "blank" ? 0 : id));
    }
    return sum(resultArr.map((n, i) => n * i));
}
export const solution = 6423258376982;
