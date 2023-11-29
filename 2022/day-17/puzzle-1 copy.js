import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, constrain, pairSum } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const rocks = [
`####`,
` # 
###
 # `,
`  #
  #
###`,
`#
#
#
#`,
`##
##`,
].map(b => b.split("\n").map(l => l.split("").map(c => c === "#")).reverse());

export default function solution(input) {
    const wind = input.split("");
    const tower = [];
    let rockType = 0;
    let rockPos = [2, tower.length + 3];
    let windIndex = 0;
    let setRocks = 0;
    for (let i = 0; setRocks < 2022; i++) {
        const rock = rocks[rockType];
        if (i%2 === 0) {
            const dx = wind[windIndex++ % wind.length] === "<" ? -1 : 1;
            const newX = rockPos[0] + dx;
            if (!collides(rock, [newX, rockPos[1]], tower)) {
                rockPos[0] = newX;
            }
        } else {
            const newY = rockPos[1] - 1;
            if (collides(rock, [rockPos[0], newY], tower)) {
                for(const [y, row] of enumerate(rock)) {
                    for (const [x, piece] of enumerate(row)) {
                        const pos = pairSum([x, y], rockPos);
                        tower[pos[1]] = tower[pos[1]] || [];
                        tower[pos[1]][pos[0]] ||= piece;
                    }
                }
                rockType = (rockType + 1) % rocks.length;
                rockPos = [2, tower.length + 3];
                // console.log("rock set, new rock pos:", rockPos);
                // console.log(tower.map(l => [...l].map(item => item ? "#" : " ").join("")).reverse().join("\n"))
                // console.log("=======\n");
                setRocks++;
            } else {
                rockPos[1] = newY;
            }
        }
    }
    return tower.length;
}

function collides(rock, pos, tower) {
    for(const [y, row] of enumerate(rock)) {
        for (const [x, piece] of enumerate(row)) {
            const piecePos = pairSum([x, y], pos);
            if (piecePos[0] < 0 || piecePos[0] > 6 || piecePos[1] < 0 || piece && tower[piecePos[1]]?.[piecePos[0]]) {
                return true;
            }
        }
    }
    return false;
}

assertEqual(solution(testInput), 3068);
console.log(solution(input)); // output
