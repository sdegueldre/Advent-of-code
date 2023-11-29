import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, getNums, neighbors3d, shallowEqual } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const add = (v1, v2) => zip(v1, v2).map(sum);
const sub = (v1, v2) => zip(v1, v2).map(([a, b]) => a - b);
const dot = (v1, v2) => sum(zip(v1, v2).map(product));
const norm = (v) => sum(v.map(x => x**v.length))**(1/v.length);

export default function solution(input) {
    const lines = input.split("\n");
    const cubes =  lines.map(l => getNums(l));
    const space = [];
    const surfaces = new Set()
    for (const position of cubes) {
        const [x, y, z] = position;
        space[x] = space[x] || [];
        space[x][y] = space[x][y] || [];
        space[x][y][z] = true;
        for (const normal of neighbors3d) {
            const other = add(normal, position);
            const [a, b, c] = other;
            if (space[a]?.[b]?.[c]) {
                surfaces.delete([other, sub(position, other)].join(";"));
            } else {
                surfaces.add([position, normal].join(";"));
            }
        }
    }
    const visited = new Set();
    const volumes = [];
    let totalSurface = 0;
    for (const surface of surfaces) {
        if (visited.has(surface)) continue;
        const nextVisited = floodFill3DSurface(space, surface.split(";").map(p => p.split(",").map(n => +n)));
        let volume = 0;
        for (const item of nextVisited) {
            visited.add(item);
            const [pos, normal] = item.split(";").map(p => p.split(",").map(n => +n));
            volume += dot(normal, [1, 0, 0]) * (pos[0] + normal[0] * .5);
        };
        nextVisited.volume = volume;
        volumes.push(nextVisited);
    }
    console.log(volumes);
    return sum(volumes.filter(s => s.volume > 0).map(s => s.size));
}

function floodFill3DSurface(space, surface) {
    const pushIfValid = (pos, normal) => {
        const [a, b, c] = pos;
        const [x, y, z] = add(pos, normal);
        const item = [pos, normal];
        if (space[a]?.[b]?.[c] && !(space[x]?.[y]?.[z]) && !visited.has(item.join(";"))) {
            if (shallowEqual(pos, [2,2,5])) debugger;
            stack.push(item);
        }
    }

    let visited = new Set()
    const stack = [surface];
    while (stack.length) {
        const item = stack.pop();
        const [position, normal] = item;
        visited.add(item.join(";"));
        // neighbors with same normal
        const samePlaneDiffs = neighbors3d.filter(n => dot(normal, n) === 0);
        for (const cube of samePlaneDiffs.map(n => add(n, position))) {
            pushIfValid(cube, normal)
        }
        // same position but normals rotated outwards
        for (const outwardNormal of samePlaneDiffs) {
            const [a, b, c] = add(add(position, normal), outwardNormal);
            if (space[a]?.[b]?.[c]) continue;
            pushIfValid(position, outwardNormal);
        }

        // neighbors above the surface but with normals rotated inward
        const aboveSurface = add(position, normal);
        for (const cube of samePlaneDiffs.map(d => add(d, aboveSurface))) {
            pushIfValid(cube, sub(aboveSurface, cube));
        }
    }
    return visited;
}


assertEqual(solution("0,0,0\n0,0,1"), 10);
assertEqual(solution("0,0,1\n0,0,-1\n0,1,0\n0,-1,0\n1,0,0\n-1,0,0\n2,3,4"), 36);
// assertEqual(solution(testInput), 58);
// console.log(solution(input)); // output
