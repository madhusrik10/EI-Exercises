"use strict";
// src/models/Task.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(description, startTime, endTime, priority) {
        this.completed = false;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
    }
    toString() {
        return `${this.description}, ${this.formatTime(this.startTime)}, ${this.formatTime(this.endTime)}, ${this.priority}`;
    }
    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}
exports.Task = Task;
