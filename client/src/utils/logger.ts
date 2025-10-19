type LogLevel = "info" | "warn" | "error" | "debug";

const isProd = import.meta.env.PROD // true при vite build

const formatMessage = (level:LogLevel, message:unknown[], color:string) => {
    const time = new Date().toISOString().split('T')[1].split('.')[0];
    return [`%c[${time}] [${level.toUpperCase()}]`, `color: ${color}; font-weight: bold;`, ...message];
}

export const logger = {
    info: (...msg: unknown[]) => { 
        if (isProd) return ; 
        console.log(...formatMessage('info', msg, '#4ade80')); 
    },
    warn: (...msg: unknown[]) => {
        if (isProd) return;
        console.warn(...formatMessage('warn', msg, '#facc15'));
    },
    error: (...msg: unknown[]) => {
        console.error(...formatMessage('error', msg, '#f87171'));
    },
    debug: (...msg: unknown[]) => {
        if (isProd) return;
        console.debug(...formatMessage('debug', msg, '#60a5fa'));
    },
};