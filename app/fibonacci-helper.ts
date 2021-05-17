// Imports
import Big, {BigSource} from 'big.js'; // Big.js required to perform calculations beyond js's number limit.

// Methods
/**
 * Returns true if x is a perfect square.
 */
function isPerfectSquare(x: Big): boolean {
    return x.gt(0) && x.sqrt().mod(1).eq(0);
}

/**
 * Returns true if n is a Fibinacci Number, else false.
 */
export function isFibonacci(n: BigSource): boolean {
    const x: Big = Big(n);
    return isPerfectSquare(Big(5).times(x).times(x).plus(4)) || isPerfectSquare(Big(5).times(x).times(x).minus(4));
}
