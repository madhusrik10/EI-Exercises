"use strict";
// src/managers/ScheduleManager.ts
// Singleton Pattern:
// ScheduleManager: This class is implemented as a Singleton, ensuring that there is only one
// instance of the schedule manager handling all tasks throughout the application.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleManager = void 0;
// src/managers/ScheduleManager.ts
// src/managers/ScheduleManager.ts
var fs = require("fs");
var TaskFactory_1 = require("../factories/TaskFactory");
var Logger_1 = require("../utils/Logger");
var TimeValidator_1 = require("../utils/TimeValidator");
var ScheduleManager = /** @class */ (function () {
    function ScheduleManager() {
        this.tasks = [];
        this.observers = [];
        this.notificationInterval = null;
    }
    ScheduleManager.getInstance = function () {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    };
    ScheduleManager.prototype.addTask = function (description, startTime, endTime, priority) {
        var task = TaskFactory_1.TaskFactory.createTask(description, startTime, endTime, priority);
        if (task) {
            if (this.checkForConflicts(task)) {
                this.notifyObservers(task);
            }
            else {
                this.tasks.push(task);
                console.log('Task added successfully. No conflicts.');
                Logger_1.Logger.info("Task added: ".concat(task.toString()));
            }
        }
    };
    ScheduleManager.prototype.importTasksFromFile = function (filename) {
        var _this = this;
        try {
            var data = fs.readFileSync(filename, 'utf-8');
            var lines = data.split('\n').filter(function (line) { return line.trim() !== ''; });
            lines.forEach(function (line, index) {
                var _a = line.split(',').map(function (item) { return item.trim(); }), description = _a[0], startTime = _a[1], endTime = _a[2], priority = _a[3];
                if (!TimeValidator_1.TimeValidator.isValidTime(startTime) || !TimeValidator_1.TimeValidator.isValidTime(endTime)) {
                    console.log("Error: Invalid time format on line ".concat(index + 1, ". Task skipped."));
                    return;
                }
                _this.addTask(description, startTime, endTime, priority);
            });
            console.log('Tasks imported successfully.');
        }
        catch (error) {
            console.error('Error importing tasks from file:', error);
        }
    };
    ScheduleManager.prototype.removeTask = function (description) {
        var index = this.tasks.findIndex(function (task) { return task.description === description; });
        if (index !== -1) {
            this.tasks.splice(index, 1);
            console.log('Task removed successfully.');
            Logger_1.Logger.info("Task removed: ".concat(description));
        }
        else {
            console.log('Error: Task not found.');
        }
    };
    ScheduleManager.prototype.viewTasks = function () {
        if (this.tasks.length === 0) {
            console.log('No tasks scheduled for the day.');
        }
        else {
            this.tasks
                .sort(function (a, b) { return a.startTime.getTime() - b.startTime.getTime(); })
                .forEach(function (task) { return console.log(task.toString()); });
        }
    };
    ScheduleManager.prototype.editTask = function (oldDescription, newDescription, startTime, endTime, priority) {
        var index = this.tasks.findIndex(function (task) { return task.description === oldDescription; });
        if (index !== -1) {
            var newTask = TaskFactory_1.TaskFactory.createTask(newDescription, startTime, endTime, priority);
            if (newTask && !this.checkForConflicts(newTask, index)) {
                this.tasks[index] = newTask;
                console.log('Task edited successfully. No conflicts.');
                Logger_1.Logger.info("Task edited: ".concat(oldDescription, " to ").concat(newTask.toString()));
            }
            else {
                console.log('Error: Task conflicts with existing tasks.');
            }
        }
        else {
            console.log('Error: Task not found.');
        }
    };
    ScheduleManager.prototype.markTaskAsCompleted = function (description) {
        var task = this.tasks.find(function (task) { return task.description === description; });
        if (task) {
            task.completed = true;
            this.notifyCompletion(task);
            console.log("Task \"".concat(description, "\" marked as completed."));
            Logger_1.Logger.info("Task completed: ".concat(task.toString()));
        }
        else {
            console.log('Error: Task not found.');
        }
    };
    ScheduleManager.prototype.viewTasksByPriority = function (priority) {
        var normalizedPriority = priority.trim().toLowerCase();
        var filteredTasks = this.tasks.filter(function (task) {
            return task.priority.toLowerCase() === normalizedPriority;
        });
        if (filteredTasks.length === 0) {
            console.log("No tasks found with priority: ".concat(priority));
        }
        else {
            console.log("Tasks with priority ".concat(priority, ":"));
            filteredTasks.forEach(function (task) {
                console.log("- ".concat(task.description, " from ").concat(task.startTime.toLocaleTimeString(), " to ").concat(task.endTime.toLocaleTimeString()));
            });
        }
    };
    ScheduleManager.prototype.exportTasksToFile = function (filename) {
        try {
            var data = this.tasks.map(function (task) { return task.toString(); }).join('\n');
            fs.writeFileSync(filename, data);
            console.log('Tasks exported successfully.');
        }
        catch (error) {
            console.error('Error exporting tasks to file:', error);
        }
    };
    ScheduleManager.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    ScheduleManager.prototype.checkForConflicts = function (newTask, currentIndex) {
        if (currentIndex === void 0) { currentIndex = -1; }
        for (var i = 0; i < this.tasks.length; i++) {
            if (i !== currentIndex) {
                var task = this.tasks[i];
                if ((newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
                    (newTask.endTime > task.startTime && newTask.endTime <= task.endTime)) {
                    return true;
                }
            }
        }
        return false;
    };
    ScheduleManager.prototype.notifyObservers = function (task) {
        this.observers.forEach(function (observer) { return observer(task); });
    };
    ScheduleManager.prototype.notifyCompletion = function (task) {
        var completionMessage = "Task \"".concat(task.description, "\" [").concat(task.priority, "] completed at ").concat(new Date().toLocaleTimeString(), ".");
        console.log(completionMessage);
    };
    // Start checking for notifications
    ScheduleManager.prototype.startNotifications = function () {
        var _this = this;
        this.notificationInterval = setInterval(function () {
            _this.tasks.forEach(function (task) {
                var now = new Date();
                if (!task.completed && task.startTime <= now && task.endTime >= now) {
                    console.log("Notification: Task \"".concat(task.description, "\" is ongoing."));
                }
            });
        }, 60000); // Check every minute
    };
    // Stop notifications
    ScheduleManager.prototype.stopNotifications = function () {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
            this.notificationInterval = null;
        }
    };
    return ScheduleManager;
}());
exports.ScheduleManager = ScheduleManager;
// private checkForDueTasks(): void {
//   const now = new Date();
//   this.tasks.forEach(task => {
//     if (task.startTime <= now && !task.completed) {
//       console.log(`Notification: Task "${task.description}" is due now.`);
//       Logger.info(`Notification: Task "${task.description}" is due now.`);
//     }
//   });
// }
// public startNotificationTimer(interval: number = 60000): void {
//   setInterval(() => this.checkForDueTasks(), interval);
// }
