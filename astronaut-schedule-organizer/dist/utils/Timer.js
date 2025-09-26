"use strict";
// src/utils/Timer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
class Timer {
    constructor() {
        this.intervalId = null;
        this.seconds = 0;
    }
    startTimer() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.seconds++;
                console.log(`Timer: ${this.formatTime(this.seconds)}`);
            }, 1000);
            console.log('Timer started.');
        }
        else {
            console.log('Timer is already running.');
        }
    }
    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('Timer stopped.');
        }
        else {
            console.log('Timer is not running.');
        }
    }
    resetTimer() {
        this.stopTimer();
        this.seconds = 0;
        console.log('Timer reset.');
    }
    formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}
exports.Timer = Timer;
