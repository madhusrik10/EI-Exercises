// src/app.ts

import { ScheduleManager } from './managers/ScheduleManager';
import { TaskConflictObserver, TaskCompletionObserver } from './observers/TaskObservers';
import { Timer } from './utils/Timer';
import { TimeValidator } from './utils/TimeValidator'; // Import TimeValidator

// Initialize ScheduleManager (Singleton)
const scheduleManager = ScheduleManager.getInstance();

// Add Observers
scheduleManager.addObserver(TaskConflictObserver);
scheduleManager.addObserver(TaskCompletionObserver);

// Initialize Timer
const timer = new Timer();

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

function prompt(question: string) {
  return new Promise<string>((resolve) => {
    readline.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

async function main() {
  let exit = false;
  while (!exit) {
    showMenu();
    const choice = await prompt('');

    switch (choice) {
      case '1':
        const description = await prompt('Enter task description: ');
        const startTime = await prompt('Enter start time (HH:MM): ');
        const endTime = await prompt('Enter end time (HH:MM): ');
        const priority = await prompt('Enter priority level (High, Medium, Low): ');

        if (!TimeValidator.isValidTime(startTime) || !TimeValidator.isValidTime(endTime)) {
          console.log('Error: Invalid time format.');
          break;
        }

        scheduleManager.addTask(description, startTime, endTime, priority);
        break;
      case '2':
        const removeDescription = await prompt('Enter task description to remove: ');
        scheduleManager.removeTask(removeDescription);
        break;
      case '3':
        scheduleManager.viewTasks();
        break;
      case '4':
        const oldDescription = await prompt('Enter task description to edit: ');
        const newDescription = await prompt('Enter new task description: ');
        const newStartTime = await prompt('Enter new start time (HH:MM): ');
        const newEndTime = await prompt('Enter new end time (HH:MM): ');
        const newPriority = await prompt('Enter new priority level (High, Medium, Low): ');

        if (!TimeValidator.isValidTime(newStartTime) || !TimeValidator.isValidTime(newEndTime)) {
          console.log('Error: Invalid time format.');
          break;
        }

        scheduleManager.editTask(oldDescription, newDescription, newStartTime, newEndTime, newPriority);
        break;
      case '5':
        const completeDescription = await prompt('Enter task description to mark as completed: ');
        scheduleManager.markTaskAsCompleted(completeDescription);
        break;
      case '6':
        const priorityLevel = await prompt('Enter priority level to view tasks (High, Medium, Low): ');
        scheduleManager.viewTasksByPriority(priorityLevel);
        break;
      case '7':
        const importFilename = await prompt('Enter the filename to import tasks from: ');
        scheduleManager.importTasksFromFile(importFilename);
        break;
      case '8':
        const exportFilename = await prompt('Enter the filename to export tasks to: ');
        scheduleManager.exportTasksToFile(exportFilename);
        break;
      case '9':
        timer.startTimer();
        break;
      case '10':
        timer.stopTimer();
        break;
      case '11':
        timer.resetTimer();
        break;
      case '12':
        scheduleManager.startNotifications();
        break;
      case '13':
        scheduleManager.stopNotifications();
        break;
      case '14':
        exit = true;
        break;
      default:
        console.log('Invalid option. Please select a valid option (1-14).');
        break;
    }
  }

  readline.close();
}

main().then(() => {
  console.log('Thank you for using the Astronaut Daily Schedule Organizer!');
});

// //description1, HH:MM, HH:MM, High
// description2, HH:MM, HH:MM, Medium
// ...
