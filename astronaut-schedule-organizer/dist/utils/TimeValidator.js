"use strict";
// src/utils/TimeValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeValidator = void 0;
class TimeValidator {
    static isValidTime(time) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex for HH:MM format (24-hour clock)
        if (!timeRegex.test(time)) {
            console.log('Error: Invalid time format. Please use HH:MM in 24-hour format.');
            return false;
        }
        const [hours, minutes] = time.split(':').map(Number);
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            console.log('Error: Time must be between 00:00 and 23:59.');
            return false;
        }
        return true;
    }
}
exports.TimeValidator = TimeValidator;
