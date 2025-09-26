// src/factories/TaskFactory.ts

import { Task } from '../models/Task';

export class TaskFactory {
  static createTask(
    description: string,
    startTime: string,
    endTime: string,
    priority: string
  ): Task | null {
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

    return new Task(description, startDate, endDate, priority);
  }
}
