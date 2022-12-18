import { assertEqual, getInputs, sum, zip, product, logThrough, enumerate, getNums, neighbors3d } from "../../utils.js";
const { input, testInput } = getInputs(import.meta.url);

const add = (v1, v2) => zip(v1, v2).map(sum);
const sub = (v1, v2) => zip(v1, v2).map(([a, b]) => a - b);

function solution(input) {
    const lines = input.split("\n");
    const cubes =  lines.map(l => getNums(l));
    const space = [];
    let maxPoint = cubes[0];
    let minPoint = cubes[0];
    for (const cube of cubes) {
        const [x, y, z] = cube;
        space[x] = space[x] || [];
        space[x][y] = space[x][y] || [];
        space[x][y][z] = true;
        maxPoint = zip(maxPoint, cube).map(([a, b]) => Math.max(a, b));
        minPoint = zip(minPoint, cube).map(([a, b]) => Math.min(a, b));
    }

    maxPoint = add(maxPoint, [1, 1, 1]);
    minPoint = add(minPoint, [-1, -1, -1]);
    const outside = floodFill3D(space, maxPoint, minPoint);
    console.log(outside.length);
    let visible = 0;
    const water = [];
    for (const [x, y, z] of outside) {
        visible += 6;
        water[x] = water[x] || [];
        water[x][y] = water[x][y] || [];
        water[x][y][z] = true;
        for (const [a, b, c] of neighbors3d.map(n => zip(n, [x,y,z]).map(sum))) {
            if (water[a]?.[b]?.[c]) {
                visible -= 2;
            }
        }
    }

    const [width, depth, height] = add(sub(maxPoint, minPoint), [1,1,1]); // cubes are one thick
    const outsideSurface = width * depth * 2 + width * height * 2 + depth * height * 2;
    console.log({outsideSurface, visible});
    return visible - outsideSurface;
}

function floodFill3D(space, max, min) {
    let visited = new Set();
    let pointCloud = [];
    const stack = [max];
    while (stack.length) {
        const current = stack.pop();
        if (visited.has(current.join())) continue;
        const [a, b, c] = current;
        visited.add(current.join());
        if (space[a]?.[b]?.[c]) continue;
        pointCloud.push(current);
        for (const neighbor of neighbors3d.map(n => add(current, n))) {
            if (neighbor.every((coord, i) => coord <= max[i]) && neighbor.every((coord, i) => coord >= min[i])) {
                stack.push(neighbor);
            }
        }
    }
    // console.log(visited);
    // console.log(pointCloud);
    return pointCloud;
}

// assertEqual(solution(testInput), 58);
console.log(solution(input)); // 4400
