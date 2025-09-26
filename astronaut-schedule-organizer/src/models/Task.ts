// src/models/Task.ts

export class Task {
  public description: string;
  public startTime: Date;
  public endTime: Date;
  public priority: string;
  public completed: boolean = false;

  constructor(
    description: string,
    startTime: Date,
    endTime: Date,
    priority: string
  ) {
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.priority = priority;
  }

  toString(): string {
    return `${this.description}, ${this.formatTime(this.startTime)}, ${this.formatTime(this.endTime)}, ${this.priority}`;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}

  