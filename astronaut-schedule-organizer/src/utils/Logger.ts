// src/utils/Logger.ts
// Logging:
// Logger: A simple logging mechanism writes application events to a log file (application.log). 
// This can be helpful for debugging and tracking application usage.

// src/utils/Logger.ts

import * as fs from 'fs';

export class Logger {
  private static logFile = 'application.log';

  public static info(message: string): void {
    this.writeLog('INFO', message);
  }

  public static error(message: string): void {
    this.writeLog('ERROR', message);
  }

  private static writeLog(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFile, logMessage);
  }
}


