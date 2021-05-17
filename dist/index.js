"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("What is your name ? ", function (name) {
    rl.question("Where do you live ? ", function (country) {
        console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});
rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
//# sourceMappingURL=index.js.map