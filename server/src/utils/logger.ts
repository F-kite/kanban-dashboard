import fs from 'fs';
import path from 'path';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: any;
}

class Logger {
    private logFile: string;
    private logStream: fs.WriteStream;

    constructor() {
        // Создаем директорию logs если её нет
        const logsDir = path.join(__dirname, '../../logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        this.logFile = path.join(logsDir, 'app.log');
        this.logStream = fs.createWriteStream(this.logFile, { flags: 'a' });
    }

    private formatMessage(level: LogLevel, message: string, data?: any): string {
        const timestamp = new Date().toISOString();
        const logEntry: LogEntry = {
            timestamp,
            level,
            message,
            ...(data && { data })
        };

        return JSON.stringify(logEntry);
    }

    private writeLog(level: LogLevel, message: string, data?: any): void {
        const formattedMessage = this.formatMessage(level, message, data);
        const consoleMessage = `[${new Date().toISOString()}] [${level}] ${message}${data ? ' ' + JSON.stringify(data) : ''}`;

        // Вывод в консоль (для Docker)
        if (level === 'ERROR') {
            console.error(consoleMessage);
        } else if (level === 'WARN') {
            console.warn(consoleMessage);
        } else {
            console.log(consoleMessage);
        }

        // Запись в файл
        this.logStream.write(formattedMessage + '\n');
    }

    info(message: string, data?: any): void {
        this.writeLog('INFO', message, data);
    }

    warn(message: string, data?: any): void {
        this.writeLog('WARN', message, data);
    }

    error(message: string, data?: any): void {
        this.writeLog('ERROR', message, data);
    }

    // Закрытие потока при завершении приложения
    close(): void {
        this.logStream.end();
    }
}

// Экспортируем singleton экземпляр
export const logger = new Logger();

// Обработка завершения процесса для корректного закрытия файла
process.on('SIGINT', () => {
    logger.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.close();
    process.exit(0);
});

