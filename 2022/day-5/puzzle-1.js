import { assertEqual, getInputs, extractLines, chunk, zip, logThrough } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

function solution(input) {
    const [stacksData, rest] = input.split("\n\n");
    const stacks = zip(
        ...stacksData.split("\n")
            .slice(0,-1)
            .map(l => chunk([...l], 4).map(section => section.join("")).map(s => s.match(/^\s+$/) ? null : s[1]))
    )
    .map(s => s.reverse().filter(Boolean))
    const moves = extractLines(rest, /(\d+).*?(\d+).*?(\d+)/, ["num", "from", "to"])
    
    for (const { from, to, num } of moves) {
        for(let i = 0; i < num; i++)
            stacks[to - 1].push(stacks[from - 1].pop());
    }
    return stacks.map(s => s.pop()).join("");
}

assertEqual(solution(testInput), "CMZ");
console.log(solution(input)); // QNHWJVJZW
