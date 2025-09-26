"use strict";
// src/managers/ScheduleManager.ts
// Singleton Pattern:
// ScheduleManager: This class is implemented as a Singleton, ensuring that there is only one
// instance of the schedule manager handling all tasks throughout the application.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleManager = void 0;
// src/managers/ScheduleManager.ts
// src/managers/ScheduleManager.ts
const fs = __importStar(require("fs"));
const TaskFactory_1 = require("../factories/TaskFactory");
const Logger_1 = require("../utils/Logger");
const TimeValidator_1 = require("../utils/TimeValidator");
class ScheduleManager {
    constructor() {
        this.tasks = [];
        this.observers = [];
        this.notificationInterval = null;
    }
    static getInstance() {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }
    addTask(description, startTime, endTime, priority) {
        const task = TaskFactory_1.TaskFactory.createTask(description, startTime, endTime, priority);
        if (task) {
            if (this.checkForConflicts(task)) {
                this.notifyObservers(task);
            }
            else {
                this.tasks.push(task);
                console.log('Task added successfully. No conflicts.');
                Logger_1.Logger.info(`Task added: ${task.toString()}`);
            }
        }
    }
    importTasksFromFile(filename) {
        try {
            const data = fs.readFileSync(filename, 'utf-8');
            const lines = data.split('\n').filter(line => line.trim() !== '');
            lines.forEach((line, index) => {
                const [description, startTime, endTime, priority] = line.split(',').map(item => item.trim());
                if (!TimeValidator_1.TimeValidator.isValidTime(startTime) || !TimeValidator_1.TimeValidator.isValidTime(endTime)) {
                    console.log(`Error: Invalid time format on line ${index + 1}. Task skipped.`);
                    return;
                }
                this.addTask(description, startTime, endTime, priority);
            });
            console.log('Tasks imported successfully.');
        }
        catch (error) {
            console.error('Error importing tasks from file:', error);
        }
    }
    removeTask(description) {
        const index = this.tasks.findIndex((task) => task.description === description);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            console.log('Task removed successfully.');
            Logger_1.Logger.info(`Task removed: ${description}`);
        }
        else {
            console.log('Error: Task not found.');
        }
    }
    viewTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks scheduled for the day.');
        }
        else {
            this.tasks
                .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                .forEach((task) => console.log(task.toString()));
        }
    }
    editTask(oldDescription, newDescription, startTime, endTime, priority) {
        const index = this.tasks.findIndex((task) => task.description === oldDescription);
        if (index !== -1) {
            const newTask = TaskFactory_1.TaskFactory.createTask(newDescription, startTime, endTime, priority);
            if (newTask && !this.checkForConflicts(newTask, index)) {
                this.tasks[index] = newTask;
                console.log('Task edited successfully. No conflicts.');
                Logger_1.Logger.info(`Task edited: ${oldDescription} to ${newTask.toString()}`);
            }
            else {
                console.log('Error: Task conflicts with existing tasks.');
            }
        }
        else {
            console.log('Error: Task not found.');
        }
    }
    markTaskAsCompleted(description) {
        const task = this.tasks.find((task) => task.description === description);
        if (task) {
            task.completed = true;
            this.notifyCompletion(task);
            console.log(`Task "${description}" marked as completed.`);
            Logger_1.Logger.info(`Task completed: ${task.toString()}`);
        }
        else {
            console.log('Error: Task not found.');
        }
    }
    viewTasksByPriority(priority) {
        const normalizedPriority = priority.trim().toLowerCase();
        const filteredTasks = this.tasks.filter(task => {
            return task.priority.toLowerCase() === normalizedPriority;
        });
        if (filteredTasks.length === 0) {
            console.log(`No tasks found with priority: ${priority}`);
        }
        else {
            console.log(`Tasks with priority ${priority}:`);
            filteredTasks.forEach(task => {
                console.log(`- ${task.description} from ${task.startTime.toLocaleTimeString()} to ${task.endTime.toLocaleTimeString()}`);
            });
        }
    }
    exportTasksToFile(filename) {
        try {
            const data = this.tasks.map(task => task.toString()).join('\n');
            fs.writeFileSync(filename, data);
            console.log('Tasks exported successfully.');
        }
        catch (error) {
            console.error('Error exporting tasks to file:', error);
        }
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    checkForConflicts(newTask, currentIndex = -1) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (i !== currentIndex) {
                const task = this.tasks[i];
                if ((newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
                    (newTask.endTime > task.startTime && newTask.endTime <= task.endTime)) {
                    return true;
                }
            }
        }
        return false;
    }
    notifyObservers(task) {
        this.observers.forEach((observer) => observer(task));
    }
    notifyCompletion(task) {
        const completionMessage = `Task "${task.description}" [${task.priority}] completed at ${new Date().toLocaleTimeString()}.`;
        console.log(completionMessage);
    }
    // Start checking for notifications
    startNotifications() {
        this.notificationInterval = setInterval(() => {
            this.tasks.forEach(task => {
                const now = new Date();
                if (!task.completed && task.startTime <= now && task.endTime >= now) {
                    console.log(`Notification: Task "${task.description}" is ongoing.`);
                }
            });
        }, 60000); // Check every minute
    }
    // Stop notifications
    stopNotifications() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
            this.notificationInterval = null;
        }
    }
}
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
