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
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleManager_1 = require("./managers/ScheduleManager");
const TaskObservers_1 = require("./observers/TaskObservers");
const Timer_1 = require("./utils/Timer");
const TimeValidator_1 = require("./utils/TimeValidator"); // Import TimeValidator
// Initialize ScheduleManager (Singleton)
const scheduleManager = ScheduleManager_1.ScheduleManager.getInstance();
// Add Observers
scheduleManager.addObserver(TaskObservers_1.TaskConflictObserver);
scheduleManager.addObserver(TaskObservers_1.TaskCompletionObserver);
// Initialize Timer
const timer = new Timer_1.Timer();
// Command Line Interface
const readline = require('readline').createInterface({
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
    console.log('7. Exit');
    console.log('Select an option (1-7):');
}
function prompt(question) {
    return new Promise((resolve) => {
        readline.question(question, (answer) => {
            resolve(answer);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let exit = false;
        while (!exit) {
            showMenu();
            const choice = yield prompt('');
            switch (choice) {
                case '1':
                    const description = yield prompt('Enter task description: ');
                    const startTime = yield prompt('Enter start time (HH:MM): ');
                    const endTime = yield prompt('Enter end time (HH:MM): ');
                    const priority = yield prompt('Enter priority level (High, Medium, Low): ');
                    if (!TimeValidator_1.TimeValidator.isValidTime(startTime) || !TimeValidator_1.TimeValidator.isValidTime(endTime)) {
                        console.log('Error: Invalid time format.');
                        break;
                    }
                    scheduleManager.addTask(description, startTime, endTime, priority);
                    break;
                case '2':
                    const removeDescription = yield prompt('Enter task description to remove: ');
                    scheduleManager.removeTask(removeDescription);
                    break;
                case '3':
                    scheduleManager.viewTasks();
                    break;
                case '4':
                    const oldDescription = yield prompt('Enter task description to edit: ');
                    const newDescription = yield prompt('Enter new task description: ');
                    const newStartTime = yield prompt('Enter new start time (HH:MM): ');
                    const newEndTime = yield prompt('Enter new end time (HH:MM): ');
                    const newPriority = yield prompt('Enter new priority level (High, Medium, Low): ');
                    if (!TimeValidator_1.TimeValidator.isValidTime(newStartTime) || !TimeValidator_1.TimeValidator.isValidTime(newEndTime)) {
                        console.log('Error: Invalid time format.');
                        break;
                    }
                    scheduleManager.editTask(oldDescription, newDescription, newStartTime, newEndTime, newPriority);
                    break;
                case '5':
                    const completeDescription = yield prompt('Enter task description to mark as completed: ');
                    scheduleManager.markTaskAsCompleted(completeDescription);
                    break;
                case '6':
                    const priorityLevel = yield prompt('Enter priority level to view tasks (High, Medium, Low): ');
                    scheduleManager.viewTasksByPriority(priorityLevel);
                    break;
                case '7':
                    exit = true;
                    break;
                default:
                    console.log('Invalid option. Please select a valid option (1-7).');
                    break;
            }
        }
        readline.close();
    });
}
main().then(() => {
    console.log('Thank you for using the Astronaut Daily Schedule Organizer!');
});
// //description1, HH:MM, HH:MM, High
// description2, HH:MM, HH:MM, Medium
// ...
