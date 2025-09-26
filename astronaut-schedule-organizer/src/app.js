"use strict";
// src/app.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ScheduleManager_1 = require("./managers/ScheduleManager");
var TaskObservers_1 = require("./observers/TaskObservers");
var Timer_1 = require("./utils/Timer");
var TimeValidator_1 = require("./utils/TimeValidator"); // Import TimeValidator
// Initialize ScheduleManager (Singleton)
var scheduleManager = ScheduleManager_1.ScheduleManager.getInstance();
// Add Observers
scheduleManager.addObserver(TaskObservers_1.TaskConflictObserver);
scheduleManager.addObserver(TaskObservers_1.TaskCompletionObserver);
// Initialize Timer
var timer = new Timer_1.Timer();
// Command Line Interface
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
function showMenu() {
    console.log('\nAstronaut Daily Schedule Organizer');
    console.log('1. Add Task');
    console.log('2. Remove Task');
    console.log('3. View Tasks');
    console.log('4. Edit Task');
    console.log('5. Mark Task as Completed');
    console.log('6. View Tasks by Priority');
    console.log('7. Import Tasks from File');
    console.log('8. Export Tasks to File');
    console.log('9. Start Timer');
    console.log('10. Stop Timer');
    console.log('11. Reset Timer');
    console.log('12. Start Notifications');
    console.log('13. Stop Notifications');
    console.log('14. Exit');
    console.log('Select an option (1-14):');
}
function prompt(question) {
    return new Promise(function (resolve) {
        readline.question(question, function (answer) {
            resolve(answer);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var exit, choice, _a, description, startTime, endTime, priority, removeDescription, oldDescription, newDescription, newStartTime, newEndTime, newPriority, completeDescription, priorityLevel, importFilename, exportFilename;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    exit = false;
                    _b.label = 1;
                case 1:
                    if (!!exit) return [3 /*break*/, 33];
                    showMenu();
                    return [4 /*yield*/, prompt('')];
                case 2:
                    choice = _b.sent();
                    _a = choice;
                    switch (_a) {
                        case '1': return [3 /*break*/, 3];
                        case '2': return [3 /*break*/, 8];
                        case '3': return [3 /*break*/, 10];
                        case '4': return [3 /*break*/, 11];
                        case '5': return [3 /*break*/, 17];
                        case '6': return [3 /*break*/, 19];
                        case '7': return [3 /*break*/, 21];
                        case '8': return [3 /*break*/, 23];
                        case '9': return [3 /*break*/, 25];
                        case '10': return [3 /*break*/, 26];
                        case '11': return [3 /*break*/, 27];
                        case '12': return [3 /*break*/, 28];
                        case '13': return [3 /*break*/, 29];
                        case '14': return [3 /*break*/, 30];
                    }
                    return [3 /*break*/, 31];
                case 3: return [4 /*yield*/, prompt('Enter task description: ')];
                case 4:
                    description = _b.sent();
                    return [4 /*yield*/, prompt('Enter start time (HH:MM): ')];
                case 5:
                    startTime = _b.sent();
                    return [4 /*yield*/, prompt('Enter end time (HH:MM): ')];
                case 6:
                    endTime = _b.sent();
                    return [4 /*yield*/, prompt('Enter priority level (High, Medium, Low): ')];
                case 7:
                    priority = _b.sent();
                    if (!TimeValidator_1.TimeValidator.isValidTime(startTime) || !TimeValidator_1.TimeValidator.isValidTime(endTime)) {
                        console.log('Error: Invalid time format.');
                        return [3 /*break*/, 32];
                    }
                    scheduleManager.addTask(description, startTime, endTime, priority);
                    return [3 /*break*/, 32];
                case 8: return [4 /*yield*/, prompt('Enter task description to remove: ')];
                case 9:
                    removeDescription = _b.sent();
                    scheduleManager.removeTask(removeDescription);
                    return [3 /*break*/, 32];
                case 10:
                    scheduleManager.viewTasks();
                    return [3 /*break*/, 32];
                case 11: return [4 /*yield*/, prompt('Enter task description to edit: ')];
                case 12:
                    oldDescription = _b.sent();
                    return [4 /*yield*/, prompt('Enter new task description: ')];
                case 13:
                    newDescription = _b.sent();
                    return [4 /*yield*/, prompt('Enter new start time (HH:MM): ')];
                case 14:
                    newStartTime = _b.sent();
                    return [4 /*yield*/, prompt('Enter new end time (HH:MM): ')];
                case 15:
                    newEndTime = _b.sent();
                    return [4 /*yield*/, prompt('Enter new priority level (High, Medium, Low): ')];
                case 16:
                    newPriority = _b.sent();
                    if (!TimeValidator_1.TimeValidator.isValidTime(newStartTime) || !TimeValidator_1.TimeValidator.isValidTime(newEndTime)) {
                        console.log('Error: Invalid time format.');
                        return [3 /*break*/, 32];
                    }
                    scheduleManager.editTask(oldDescription, newDescription, newStartTime, newEndTime, newPriority);
                    return [3 /*break*/, 32];
                case 17: return [4 /*yield*/, prompt('Enter task description to mark as completed: ')];
                case 18:
                    completeDescription = _b.sent();
                    scheduleManager.markTaskAsCompleted(completeDescription);
                    return [3 /*break*/, 32];
                case 19: return [4 /*yield*/, prompt('Enter priority level to view tasks (High, Medium, Low): ')];
                case 20:
                    priorityLevel = _b.sent();
                    scheduleManager.viewTasksByPriority(priorityLevel);
                    return [3 /*break*/, 32];
                case 21: return [4 /*yield*/, prompt('Enter the filename to import tasks from: ')];
                case 22:
                    importFilename = _b.sent();
                    scheduleManager.importTasksFromFile(importFilename);
                    return [3 /*break*/, 32];
                case 23: return [4 /*yield*/, prompt('Enter the filename to export tasks to: ')];
                case 24:
                    exportFilename = _b.sent();
                    scheduleManager.exportTasksToFile(exportFilename);
                    return [3 /*break*/, 32];
                case 25:
                    timer.startTimer();
                    return [3 /*break*/, 32];
                case 26:
                    timer.stopTimer();
                    return [3 /*break*/, 32];
                case 27:
                    timer.resetTimer();
                    return [3 /*break*/, 32];
                case 28:
                    scheduleManager.startNotifications();
                    return [3 /*break*/, 32];
                case 29:
                    scheduleManager.stopNotifications();
                    return [3 /*break*/, 32];
                case 30:
                    exit = true;
                    return [3 /*break*/, 32];
                case 31:
                    console.log('Invalid option. Please select a valid option (1-14).');
                    return [3 /*break*/, 32];
                case 32: return [3 /*break*/, 1];
                case 33:
                    readline.close();
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function () {
    console.log('Thank you for using the Astronaut Daily Schedule Organizer!');
});
// //description1, HH:MM, HH:MM, High
// description2, HH:MM, HH:MM, Medium
// ...
