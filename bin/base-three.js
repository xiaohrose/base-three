#!/usr/bin/env node
const main = require("../dist/index.js");

if (typeof main.default === "function") {
    main.default(process.argv.slice(2));
} else {
    console.error("Error: The module does not export a function.");
    process.exit(1);
}
