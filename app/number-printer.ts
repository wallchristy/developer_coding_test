// Imports
import {Interface} from 'readline';
import * as reader from 'readline';
import {isFibonacci} from './fibonacci-helper';

// Global Variables
const conclusion: string = "Thanks for playing";
const question1: string = "Please input the amount of time in seconds between emitting numbers and their frequency";
const question2: string = "Please enter the first number";
const question3: string = "Please enter the next number";

class NumberPrinter {

    // Local Variables
    rl: Interface = reader.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on("close", function() {
        process.exit(0);
    });

    private delayTime: number;
    private interval: NodeJS.Timeout;
    private isRunning: boolean = true;
    private isTimerPaused: boolean = true;
    private numbers: {[key: string]: number} = {};

    constructor() {
        this.main();
    }

    // Methods
    /**
     * Formats the [number]:[frequency] on a single line for all the numbers entered
     */
    getFormattedNumbers(): string {
        let logString: string = '';
        for (const key in this.numbers) {
            logString += `${key}:${this.numbers[key]} `
        }
        return logString
    }

    /**
     * Retrieves lines from rl interface
     */
    async *lineGenerator() {
        for await (const line of this.rl) {
            yield line;
        }
    }

    async main(): Promise<void> {
        // Loops until application closed
        // First it retrieves a delayTime number. Continues to request until a number given
        // After this it starts the timer and accepts number inputs and some text commands.
        while (this.isRunning) {
            if (!this.delayTime) {
                this.doPrompt(question1);
            } else if (Object.keys(this.numbers).length) {
                this.doPrompt(question3);
            } else {
                this.doPrompt(question2);
            }
            let arg: string = (await this.getLine() || '').toLowerCase();
            if (!arg) {
                continue;
            }
            const numberArg: number = Number(arg);

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
            } else if (arg === 'halt') {
                if (this.isTimerPaused) {
                    console.log('Timer is already halted');
                } else {
                    this.pauseTimer();
                    console.log('Timer halted');
                }
            } else if (arg === 'resume') {
                if (this.isTimerPaused) {
                    this.startTimer();
                    console.log('Timer resumed');
                } else {
                    console.log('Timer is already resumed');
                }
            } else if (!isNaN(numberArg)) {
                if (isFibonacci(arg)) {
                    console.log('FIB');
                }
                if (this.numbers[arg]) {
                    this.numbers[arg] += 1;
                } else {
                    this.numbers[arg] = 1;
                }
            }
        }
    }

    /**
     * Pose a string as the prompt for input.
     * @param value
     */
    private doPrompt(value: string) {
        this.rl.setPrompt(value + '\n');
        this.rl.prompt();
    }

    /**
     * Returns the readline lines in a generator (to avoid callbacks)
     */
    private getLine = (() => {
        const getLineGen = this.lineGenerator();
        return async () => ((await getLineGen.next()).value);
    })();

    /**
     * Pauses the timer by clearing setInterval
     */
    private pauseTimer() {
        clearInterval(this.interval);
        this.isTimerPaused = true;
    }

    /**
     * Starts the timer using the inputted delayTime (frequency)
     */
    private startTimer() {
        this.interval = setInterval(() => {
            console.log(this.getFormattedNumbers());
        }, this.delayTime * 1000);
        this.isTimerPaused = false;
    }
}

export {NumberPrinter};
