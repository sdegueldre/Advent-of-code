import { assertEqual, getInputs } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

export default function solution(input) {
    const lines = input.split("\n").map(l => l.split(" "));
    let x = 1;
    let cycle = 1;
    const screen = [...Array(6)].map(_ => Array(40))
    const drawPixel = () => {
        if (cycle > 240) return;
        cycle--; // in cycle 1 we draw pixel 0
        const targetPx = cycle % 40; 
        screen[(cycle / 40) | 0][targetPx] = x - 1 <= targetPx && x + 1 >= targetPx ? "#" : ".";
        cycle++; // restore cycle
    }
    for (const [instruction, arg] of lines) {
        // begin cycle
        drawPixel();
        cycle++; // end cycle
        if (instruction === "addx") {
            // begin cycle
            drawPixel();
            x += +arg; cycle++; // end cycle
        }
    }
    return screen.map(l => l.join("")).join("\n");
}

assertEqual(solution(testInput),
`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
console.log(solution(input));
/**
 * ####.####..##..####.####.#....#..#.####.
 * #....#....#..#....#.#....#....#..#.#....
 * ###..###..#......#..###..#....####.###..
 * #....#....#.....#...#....#....#..#.#....
 * #....#....#..#.#....#....#....#..#.#....
 * #....####..##..####.####.####.#..#.####
 */
