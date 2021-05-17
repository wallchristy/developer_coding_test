const expect = require('chai').expect;
const {NumberPrinter} = require('../app/number-printer');
const {isFibonacci} = require('../app/fibonacci-helper');

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Number Printer", function() {
    describe("Basic Test", function() {
        it("enters a frequency of 5, enters 1, waits 6 seconds, and quits", async function() {
            let printer = new NumberPrinter();
            printer.rl.write('5\n');
            printer.rl.write('1\n');
            await sleep(1);
            expect(printer.getFormattedNumbers()).to.equal('1:1 ');
            printer.rl.write('quit\n');
        });
    });

    describe("Fibonacci Tester", function() {
        // Test numbers taken from here: http://www.fullbooks.com/The-first-1001-Fibonacci-Numbers.html
        const bigFib = '43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875';

        it("checks a set of numbers to see if it checks them as fibonacci properly", function() {
            // Test numbers taken from here: http://www.fullbooks.com/The-first-1001-Fibonacci-Numbers.html
            const result1 = isFibonacci(21);
            const result2 = isFibonacci(22);
            const result3 = isFibonacci(6765);
            const result4 = isFibonacci('6765');
            const result5 = isFibonacci(bigFib);
            const result6 = isFibonacci(Number(bigFib));

            expect(result1).to.equal(true);
            expect(result2).to.equal(false); // Not a fib number
            expect(result3).to.equal(true);
            expect(result4).to.equal(true);
            expect(result5).to.equal(true);
            expect(result6).to.equal(false); // Casting to number will alter it
        });
        it("checks if 21 is fib (true)", function() {
            expect(isFibonacci(21)).to.equal(true);
        });
        it("checks if 22 is fib (false)", function() {
            expect(isFibonacci(22)).to.equal(false);
        });
        it("checks if 6765 in number format is fib (true)", function() {
            expect(isFibonacci(21)).to.equal(true);
        });
        it("checks if 6765 in string format is fib (true)", function() {
            expect(isFibonacci(21)).to.equal(true);
        });
        it("checks if a high fibonacci number in string format is fib (true)", function() {
            expect(isFibonacci(bigFib)).to.equal(true);
        });
        it("checks if a high fibonacci number in number format is fib (false)", function() {
            expect(isFibonacci(Number(bigFib))).to.equal(false); // Casting to number will alter it
        });
    });
});
