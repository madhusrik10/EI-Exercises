"use strict";
// src/factories/TaskFactory.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = void 0;
var Task_1 = require("../models/Task");
var TaskFactory = /** @class */ (function () {
    function TaskFactory() {
    }
    TaskFactory.createTask = function (description, startTime, endTime, priority) {
        var _a = startTime.split(':').map(Number), startHours = _a[0], startMinutes = _a[1];
        var _b = endTime.split(':').map(Number), endHours = _b[0], endMinutes = _b[1];
        var startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0);
        var endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0, 0);
        if (endDate <= startDate) {
            console.log('Error: End time must be after start time.');
            return null;
        }
        return new Task_1.Task(description, startDate, endDate, priority);
    };
    return TaskFactory;
}());
exports.TaskFactory = TaskFactory;
