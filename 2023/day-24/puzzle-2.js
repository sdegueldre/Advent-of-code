import { readFileSync } from "fs";
import { enumerate } from "../../utils.js";
import { init } from "z3-solver";
import assert from "assert";
const { Context } = await init();
const { Solver, Real } = Context("ctx");

const testInput = readFileSync(new URL("./puzzle-2.test", import.meta.url), "utf-8");
export const testCases = [[testInput, 47]];

export async function solve(input) {
    const lines = input
        .split("\n")
        .map((l) => l.split(" @ ").map((p) => p.split(", ").map((n) => +n)));

    const solver = new Solver();
    const [sx, sy, sz, vx, vy, vz] = ["sx", "sy", "sz", "vx", "vy", "vz"].map((id) =>
        Real.const(id)
    );
    for (const [i, [[x1, y1, z1], [dx1, dy1, dz1]]] of enumerate(lines.slice(0, 3))) {
        const t = Real.const(`t${i + 1}`);
        solver.add(t.mul(dx1).add(x1).eq(t.mul(vx).add(sx)));
        solver.add(t.mul(dy1).add(y1).eq(t.mul(vy).add(sy)));
        solver.add(t.mul(dz1).add(z1).eq(t.mul(vz).add(sz)));
    }
    assert.equal(await solver.check(), "sat");
    return +solver.model().eval(sx.add(sy).add(sz)).asString();
}
export const solution = 843888100572888;
