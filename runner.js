import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { argv } from "process";
import { assertEqual, getInput, submit } from "./utils.js";
import { createInterface } from "readline/promises";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});
process.on("exit", () => rl.close());

if (argv.includes("--help") || argv.includes("-h")) {
    console.log(
        "Usage:\nnode runner.js <day> <year>\nday and year defaults to current day and current year"
    );
    process.exit();
}

const now = new Date();
const day = (argv[2] || now.getDate()).toString().padStart(2, "0");
const year = argv[3] || now.getFullYear().toString();

const parts = {
    "Part 1": resolve(`./${year}/day-${day}/puzzle-1.js`),
    "Part 2": resolve(`./${year}/day-${day}/puzzle-2.js`),
};

for (const [part, file] of Object.entries(parts)) {
    console.log(part);
    if (!existsSync(file)) {
        console.log(`Couldn't find file "${file}", skipping.`);
        process.exit();
    }

    const { solve, testCases, solution } = await import(file);
    if (
        !testCases.every(([input, expected]) => {
            if (solve.length === 1) {
                return assertEqual(solve(input), expected);
            }
            return assertEqual(solve(...input), expected);
        })
    ) {
        console.log("Some tests failed, aborting");
        process.exit();
    }
    console.log("All tests passed.");
    console.time(part);
    const output = solve(await getInput(year, day));
    console.timeEnd(part);
    if (solution !== undefined) {
        console.log("Checking against known solution.");
        assertEqual(output, solution);
    } else {
        console.log("Output:\n");
        console.log(output);
        if (!["", "y", "Y"].includes(await rl.question("Submit solution?"))) {
            continue;
        }
        const success = await submit(output, year, day, part.at(-1));
        if (!success) {
            process.exit();
        }
        console.log("Success!");
        if (part === "Part 1" && !existsSync(parts["Part 2"])) {
            console.log("Duplicating first solution");
            const p1 = readFileSync(file, "utf-8");
            writeFileSync(parts["Part 2"], p1.replace("puzzle-1.test", "puzzle-2.test"));
            copyFileSync(
                resolve(`./${year}/day-${day}/puzzle-1.test`),
                resolve(`./${year}/day-${day}/puzzle-2.test`)
            );
            process.exit();
        }
    }
}
process.exit(); // Won't exit on its own because of readline interface being alive
