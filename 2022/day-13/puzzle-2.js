import { assertEqual, getInputs, enumerate } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

/**
 * 1 = ordered, -1 = bad order, 0 = not yet known
 * @param {*} param0 
 * @returns 
 */
function isOrdered([left, right]) {
    if (typeof left === "number" && typeof right === "number") {
        return right - left;
    }
    if (typeof left === "number") {
        left = [left];
    }
    if (typeof right === "number") {
        right = [right];
    }
    for (const [i, item] of enumerate(left)) {
        if (i >= right.length) {
            return -1;
        }
        const order = isOrdered([item, right[i]]);
        if (order !== 0) {
            return order;
        }
    }
    return right.length - left.length;
}

export default function solution(input) {
    const pairs = input.split(/\s+/).map(l => JSON.parse(l));
    const dividers = new Set([[[2]], [[6]]]);
    pairs.push(...dividers);
    pairs.sort((a, b) => isOrdered([b, a]));
    return [...enumerate(pairs)].reduce((acc, [i, item]) => dividers.has(item) ? acc * (i + 1) : acc, 1);
}

assertEqual(solution(testInput), 140);
console.log(solution(input)); // 22425
