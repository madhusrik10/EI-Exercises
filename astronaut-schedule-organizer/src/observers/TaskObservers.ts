// src/observers/TaskObservers.ts
// Observer Pattern:
// Observers in TaskObservers.ts: The application uses observers to notify users of task conflicts and task completion. The ScheduleManager class manages
//  a list of observers and notifies them when relevant events occur.

import { Task } from '../models/Task';

export function TaskConflictObserver(task: Task): void {
  console.log(`Error: Task conflicts with existing task "${task.description}".`);
}

export function TaskCompletionObserver(task: Task): void {
  console.log(`Observer: Task "${task.description}" has been completed.`);
}


