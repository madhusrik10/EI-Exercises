"use strict";
// src/observers/TaskObservers.ts
// Observer Pattern:
// Observers in TaskObservers.ts: The application uses observers to notify users of task conflicts and task completion. The ScheduleManager class manages
//  a list of observers and notifies them when relevant events occur.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskConflictObserver = TaskConflictObserver;
exports.TaskCompletionObserver = TaskCompletionObserver;
function TaskConflictObserver(task) {
    console.log(`Error: Task conflicts with existing task "${task.description}".`);
}
function TaskCompletionObserver(task) {
    console.log(`Observer: Task "${task.description}" has been completed.`);
}
