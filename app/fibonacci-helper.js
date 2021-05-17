"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFibonacci = void 0;
// Imports
const big_js_1 = require("big.js"); // Big.js required to perform calculations beyond js's number limit.
// Methods
/**
 * Returns true if x is a perfect square.
 */
function isPerfectSquare(x) {
    return x.gt(0) && x.sqrt().mod(1).eq(0);
}
/**
 * Returns true if n is a Fibinacci Number, else false.
 */
function isFibonacci(n) {
    const x = big_js_1.default(n);
    return isPerfectSquare(big_js_1.default(5).times(x).times(x).plus(4)) || isPerfectSquare(big_js_1.default(5).times(x).times(x).minus(4));
}
exports.isFibonacci = isFibonacci;
