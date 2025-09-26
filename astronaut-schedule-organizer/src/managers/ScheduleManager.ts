// src/managers/ScheduleManager.ts
// Singleton Pattern:
// ScheduleManager: This class is implemented as a Singleton, ensuring that there is only one
// instance of the schedule manager handling all tasks throughout the application.

// src/managers/ScheduleManager.ts

// src/managers/ScheduleManager.ts

import * as fs from 'fs';
import { Task } from '../models/Task';
import { TaskFactory } from '../factories/TaskFactory';
import { Logger } from '../utils/Logger';
import { TimeValidator } from '../utils/TimeValidator';

export class ScheduleManager {
  private static instance: ScheduleManager;
  private tasks: Task[] = [];
  private observers: Array<(task: Task) => void> = [];
  private notificationInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): ScheduleManager {
    if (!ScheduleManager.instance) {
      ScheduleManager.instance = new ScheduleManager();
    }
    return ScheduleManager.instance;
  }

  public addTask(
    description: string,
    startTime: string,
    endTime: string,
    priority: string
  ): void {
    const task = TaskFactory.createTask(description, startTime, endTime, priority);
    if (task) {
      if (this.checkForConflicts(task)) {
        this.notifyObservers(task);
      } else {
        this.tasks.push(task);
        console.log('Task added successfully. No conflicts.');
        Logger.info(`Task added: ${task.toString()}`);
      }
    }
  }

  public importTasksFromFile(filename: string): void {
    try {
      const data = fs.readFileSync(filename, 'utf-8');
      const lines = data.split('\n').filter(line => line.trim() !== '');

      lines.forEach((line, index) => {
        const [description, startTime, endTime, priority] = line.split(',').map(item => item.trim());

        if (!TimeValidator.isValidTime(startTime) || !TimeValidator.isValidTime(endTime)) {
          console.log(`Error: Invalid time format on line ${index + 1}. Task skipped.`);
          return;
        }

        this.addTask(description, startTime, endTime, priority);
      });

      console.log('Tasks imported successfully.');
    } catch (error) {
      console.error('Error importing tasks from file:', error);
    }
  }

  public removeTask(description: string): void {
    const index = this.tasks.findIndex(
      (task) => task.description === description
    );
    if (index !== -1) {
      this.tasks.splice(index, 1);
      console.log('Task removed successfully.');
      Logger.info(`Task removed: ${description}`);
    } else {
      console.log('Error: Task not found.');
    }
  }

  public viewTasks(): void {
    if (this.tasks.length === 0) {
      console.log('No tasks scheduled for the day.');
    } else {
      this.tasks
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .forEach((task) => console.log(task.toString()));
    }
  }

  public editTask(
    oldDescription: string,
    newDescription: string,
    startTime: string,
    endTime: string,
    priority: string
  ): void {
    const index = this.tasks.findIndex(
      (task) => task.description === oldDescription
    );
    if (index !== -1) {
      const newTask = TaskFactory.createTask(
        newDescription,
        startTime,
        endTime,
        priority
      );
      if (newTask && !this.checkForConflicts(newTask, index)) {
        this.tasks[index] = newTask;
        console.log('Task edited successfully. No conflicts.');
        Logger.info(`Task edited: ${oldDescription} to ${newTask.toString()}`);
      } else {
        console.log('Error: Task conflicts with existing tasks.');
      }
    } else {
      console.log('Error: Task not found.');
    }
  }

  public markTaskAsCompleted(description: string): void {
    const task = this.tasks.find((task) => task.description === description);
    if (task) {
      task.completed = true;
      this.notifyCompletion(task);
      console.log(`Task "${description}" marked as completed.`);
      Logger.info(`Task completed: ${task.toString()}`);
    } else {
      console.log('Error: Task not found.');
    }
  }

  public viewTasksByPriority(priority: string): void {
    const normalizedPriority = priority.trim().toLowerCase();

    const filteredTasks = this.tasks.filter(task => {
      return task.priority.toLowerCase() === normalizedPriority;
    });

    if (filteredTasks.length === 0) {
      console.log(`No tasks found with priority: ${priority}`);
    } else {
      console.log(`Tasks with priority ${priority}:`);
      filteredTasks.forEach(task => {
        console.log(`- ${task.description} from ${task.startTime.toLocaleTimeString()} to ${task.endTime.toLocaleTimeString()}`);
      });
    }
  }

  public exportTasksToFile(filename: string): void {
    try {
      const data = this.tasks.map(task => task.toString()).join('\n');
      fs.writeFileSync(filename, data);
      console.log('Tasks exported successfully.');
    } catch (error) {
      console.error('Error exporting tasks to file:', error);
    }
  }

  public addObserver(observer: (task: Task) => void): void {
    this.observers.push(observer);
  }

  private checkForConflicts(newTask: Task, currentIndex: number = -1): boolean {
    for (let i = 0; i < this.tasks.length; i++) {
      if (i !== currentIndex) {
        const task = this.tasks[i];
        if (
          (newTask.startTime >= task.startTime && newTask.startTime < task.endTime) ||
          (newTask.endTime > task.startTime && newTask.endTime <= task.endTime)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private notifyObservers(task: Task): void {
    this.observers.forEach((observer) => observer(task));
  }

  private notifyCompletion(task: Task): void {
    const completionMessage = `Task "${task.description}" [${task.priority}] completed at ${new Date().toLocaleTimeString()}.`;
    console.log(completionMessage);
  }

  // Start checking for notifications
  public startNotifications(): void {
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
  public stopNotifications(): void {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
      this.notificationInterval = null;
    }
  }
}


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