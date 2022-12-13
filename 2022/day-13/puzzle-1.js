import { assertEqual, getInputs, sum, enumerate } from "../../utils.js";
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

function solution(input) {
    const pairs = input.split("\n\n").map(pair => pair.split("\n").map(l => JSON.parse(l)));
    return sum(pairs.map((p, i) => isOrdered(p) >= 0 ? i + 1 : 0));
}

assertEqual(solution(testInput), 13);
console.log(solution(input)); // 5557
