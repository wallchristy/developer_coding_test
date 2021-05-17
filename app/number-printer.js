"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberPrinter = void 0;
const reader = require("readline");
const fibonacci_helper_1 = require("./fibonacci-helper");
// Global Variables
const conclusion = "Thanks for playing";
const question1 = "Please input the amount of time in seconds between emitting numbers and their frequency";
const question2 = "Please enter the first number";
const question3 = "Please enter the next number";
class NumberPrinter {
    constructor() {
        // Local Variables
        this.rl = reader.createInterface({
            input: process.stdin,
            output: process.stdout
        }).on("close", function () {
            process.exit(0);
        });
        this.isRunning = true;
        this.isTimerPaused = true;
        this.numbers = {};
        /**
         * Returns the readline lines in a generator (to avoid callbacks)
         */
        this.getLine = (() => {
            const getLineGen = this.lineGenerator();
            return () => __awaiter(this, void 0, void 0, function* () { return ((yield getLineGen.next()).value); });
        })();
        this.main();
    }
    // Methods
    /**
     * Formats the [number]:[frequency] on a single line for all the numbers entered
     */
    getFormattedNumbers() {
        let logString = '';
        for (const key in this.numbers) {
            logString += `${key}:${this.numbers[key]} `;
        }
        return logString;
    }
    /**
     * Retrieves lines from rl interface
     */
    lineGenerator() {
        return __asyncGenerator(this, arguments, function* lineGenerator_1() {
            var e_1, _a;
            try {
                for (var _b = __asyncValues(this.rl), _c; _c = yield __await(_b.next()), !_c.done;) {
                    const line = _c.value;
                    yield yield __await(line);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            // Loops until application closed
            // First it retrieves a delayTime number. Continues to request until a number given
            // After this it starts the timer and accepts number inputs and some text commands.
            while (this.isRunning) {
                if (!this.delayTime) {
                    this.doPrompt(question1);
                }
                else if (Object.keys(this.numbers).length) {
                    this.doPrompt(question3);
                }
                else {
                    this.doPrompt(question2);
                }
                let arg = ((yield this.getLine()) || '').toLowerCase();
                if (!arg) {
                    continue;
                }
                const numberArg = Number(arg);
                // Set the delayTime first
                if (!this.delayTime) {
                    if (!isNaN(numberArg)) {
                        this.delayTime = numberArg;
                        this.startTimer();
                    }
                    continue;
                }
                // Read line logic
                if (arg === 'quit') {
                    this.pauseTimer();
                    console.log(this.getFormattedNumbers());
                    this.doPrompt(conclusion);
                    this.rl.pause();
                    this.isRunning = false;
                    break;
                }
                else if (arg === 'halt') {
                    if (this.isTimerPaused) {
                        console.log('Timer is already halted');
                    }
                    else {
                        this.pauseTimer();
                        console.log('Timer halted');
                    }
                }
                else if (arg === 'resume') {
                    if (this.isTimerPaused) {
                        this.startTimer();
                        console.log('Timer resumed');
                    }
                    else {
                        console.log('Timer is already resumed');
                    }
                }
                else if (!isNaN(numberArg)) {
                    if (fibonacci_helper_1.isFibonacci(arg)) {
                        console.log('FIB');
                    }
                    if (this.numbers[arg]) {
                        this.numbers[arg] += 1;
                    }
                    else {
                        this.numbers[arg] = 1;
                    }
                }
            }
        });
    }
    /**
     * Pose a string as the prompt for input.
     * @param value
     */
    doPrompt(value) {
        this.rl.setPrompt(value + '\n');
        this.rl.prompt();
    }
    /**
     * Pauses the timer by clearing setInterval
     */
    pauseTimer() {
        clearInterval(this.interval);
        this.isTimerPaused = true;
    }
    /**
     * Starts the timer using the inputted delayTime (frequency)
     */
    startTimer() {
        this.interval = setInterval(() => {
            console.log(this.getFormattedNumbers());
        }, this.delayTime * 1000);
        this.isTimerPaused = false;
    }
}
exports.NumberPrinter = NumberPrinter;
