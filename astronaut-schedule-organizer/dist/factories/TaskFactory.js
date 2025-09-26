"use strict";
// src/factories/TaskFactory.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = void 0;
const Task_1 = require("../models/Task");
class TaskFactory {
    static createTask(description, startTime, endTime, priority) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0);
        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0, 0);
        if (endDate <= startDate) {
            console.log('Error: End time must be after start time.');
            return null;
        }
        return new Task_1.Task(description, startDate, endDate, priority);
    }
}
exports.TaskFactory = TaskFactory;
