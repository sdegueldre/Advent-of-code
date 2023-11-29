import { resolve } from "path";
import { argv } from "process";

if (argv.includes("--help") || argv.includes("-h")) {
    console.log("Usage:\nnode runner.js <day> <year>\nday and year defaults to current day and current year");
    process.exit();
}

const now = new Date();
const day = (argv[2] || now.getDate()).toString().padStart(2, "0");
const year = argv[3] || now.getFullYear();

const { default: part1 } = await import(resolve(`./${year}/day-${day}/puzzle-1.js`));
const { default: part2 } = await import(resolve(`./${year}/day-${day}/puzzle-2.js`));

console.log("DONE");
