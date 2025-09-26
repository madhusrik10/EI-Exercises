"use strict";
// src/utils/Logger.ts
// Logging:
// Logger: A simple logging mechanism writes application events to a log file (application.log). 
// This can be helpful for debugging and tracking application usage.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// src/utils/Logger.ts
var fs = require("fs");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.info = function (message) {
        this.writeLog('INFO', message);
    };
    Logger.error = function (message) {
        this.writeLog('ERROR', message);
    };
    Logger.writeLog = function (level, message) {
        var timestamp = new Date().toISOString();
        var logMessage = "[".concat(timestamp, "] [").concat(level, "] ").concat(message, "\n");
        fs.appendFileSync(this.logFile, logMessage);
    };
    Logger.logFile = 'application.log';
    return Logger;
}());
exports.Logger = Logger;
