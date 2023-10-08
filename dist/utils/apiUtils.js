"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.logError = exports.formatFetchedData = exports.handleApiResponse = void 0;
const axiosService_1 = __importDefault(require("../services/axiosService"));
const NO_DATA_MESSAGE = 'Nessun dato disponibile.';
async function handleApiResponse(ctx, apiUrl, formatter, isStringArray = false) {
    if (!apiUrl) {
        ctx.reply('Per favore, fornisci parametri validi.');
        return;
    }
    try {
        const data = await fetch(apiUrl);
        if (Array.isArray(data)) {
            if (isStringArray) {
                const message = formatter(data);
                await ctx.reply(message);
            }
            else {
                for (const item of data) {
                    const message = formatter(item);
                    await ctx.reply(message);
                    if (item.coordX && item.coordY) {
                        await ctx.sendLocation(item.coordX, item.coordY);
                    }
                }
            }
        }
        else {
            const message = formatFetchedData(data, formatter);
            await ctx.reply(message);
            if (data && data.coordX && data.coordY) {
                await ctx.sendLocation(data.coordX, data.coordY);
            }
        }
    }
    catch (error) {
        logError(error);
        ctx.reply('Si è verificato un errore durante il recupero dei dati');
    }
}
exports.handleApiResponse = handleApiResponse;
function formatFetchedData(data, formatData) {
    if (Array.isArray(data)) {
        if (data.length > 0) {
            if (data.every(item => typeof item === 'string')) {
                return data.join(', ');
            }
            return data.map(formatData).join('\n----------\n');
        }
        return NO_DATA_MESSAGE;
    }
    return typeof data === 'object' && data ? formatData(data) : NO_DATA_MESSAGE;
}
exports.formatFetchedData = formatFetchedData;
function logError(error) {
    const typedError = error;
    console.error('Errore:', typedError.message || 'Errore sconosciuto');
}
exports.logError = logError;
async function fetch(apiUrl) {
    try {
        const response = await axiosService_1.default.get(apiUrl);
        return response.data;
    }
    catch (error) {
        logError(error);
        throw new Error('Si è verificato un errore durante il recupero dei dati');
    }
}
exports.fetch = fetch;
