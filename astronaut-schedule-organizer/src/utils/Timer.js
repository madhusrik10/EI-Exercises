"use strict";
// src/utils/Timer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer() {
        this.intervalId = null;
        this.seconds = 0;
    }
    Timer.prototype.startTimer = function () {
        var _this = this;
        if (!this.intervalId) {
            this.intervalId = setInterval(function () {
                _this.seconds++;
                console.log("Timer: ".concat(_this.formatTime(_this.seconds)));
            }, 1000);
            console.log('Timer started.');
        }
        else {
            console.log('Timer is already running.');
        }
    };
    Timer.prototype.stopTimer = function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('Timer stopped.');
        }
        else {
            console.log('Timer is not running.');
        }
    };
    Timer.prototype.resetTimer = function () {
        this.stopTimer();
        this.seconds = 0;
        console.log('Timer reset.');
    };
    Timer.prototype.formatTime = function (seconds) {
        var hrs = Math.floor(seconds / 3600);
        var mins = Math.floor((seconds % 3600) / 60);
        var secs = seconds % 60;
        return "".concat(hrs.toString().padStart(2, '0'), ":").concat(mins
            .toString()
            .padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
    };
    return Timer;
}());
exports.Timer = Timer;
