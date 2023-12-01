import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { argv } from "process";
import { assertEqual, getInput } from "./utils.js";

if (argv.includes("--help") || argv.includes("-h")) {
    console.log("Usage:\nnode runner.js <day> <year>\nday and year defaults to current day and current year");
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

    const input = await getInput(year, day);
    const { solve, testCases, solution } = await import(file);
    if (!testCases.every(([input, expected]) => assertEqual(solve(input), expected))) {
        console.log("Some tests failed, aborting");
        process.exit();
    }
    console.log("All tests passed.");

    const output = solve(input);
    if (solution !== undefined) {
        console.log("Checking against known solution.")
        assertEqual(output, solution)
    } else {
        console.log("Output:\n");
        console.log(output);
        if (part === "Part 1" && !existsSync(parts["Part 2"])) {
            console.log("\nDuplicating first solution");
            const p1 = readFileSync(file, "utf-8");
            writeFileSync(parts["Part 2"], p1.replace("puzzle-1.test", "puzzle-2.test"));
            copyFileSync(resolve(`./${year}/day-${day}/puzzle-1.test`), resolve(`./${year}/day-${day}/puzzle-2.test`));
            process.exit();
        }
    }
}