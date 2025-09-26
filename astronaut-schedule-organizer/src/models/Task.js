"use strict";
// src/models/Task.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var Task = /** @class */ (function () {
    function Task(description, startTime, endTime, priority) {
        this.completed = false;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
    }
    Task.prototype.toString = function () {
        return "".concat(this.description, ", ").concat(this.formatTime(this.startTime), ", ").concat(this.formatTime(this.endTime), ", ").concat(this.priority);
    };
    Task.prototype.formatTime = function (date) {
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        return "".concat(hours, ":").concat(minutes);
    };
    return Task;
}());
exports.Task = Task;
