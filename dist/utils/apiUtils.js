"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.logError = exports.formatFetchedData = exports.handleApiResponse = void 0;
const axiosService_1 = __importDefault(require("../services/axiosService"));
const functions_1 = require("./functions");
const NO_DATA_MESSAGE = 'Nessun dato disponibile.';
const DATA_ERROR_MESSAGE = 'Si è verificato un errore durante il recupero dei dati.❌';
async function handleApiResponse(ctx, apiUrl, formatter, isStringArray = false) {
    if (!apiUrl) {
        ctx.reply('Per favore, fornisci parametri validi.');
        return;
    }
    try {
        const data = await fetch(apiUrl);
        if (Array.isArray(data)) {
            if (data.length === 0) {
                await ctx.reply(NO_DATA_MESSAGE);
                return;
            }
            if (isStringArray) {
                const message = formatter(data);
                await ctx.reply(message);
            }
            else {
                for (const item of data) {
                    const message = formatter(item);
                    const inlineKeyboard = [];
                    if (item.codicePalina) {
                        inlineKeyboard.push([{ text: "Transiti🚦", callback_data: `transits:getTransits:${item.codicePalina}` }]);
                        if (item.preferita) {
                            inlineKeyboard.push([{ text: "Rimuovi dai preferiti🗑️", callback_data: `poles:remove_favorite:${item.codicePalina}` }]);
                        }
                        else {
                            inlineKeyboard.push([{ text: "Aggiungi ai preferiti⭐️", callback_data: `poles:add_favorite:${item.codicePalina}:${item.codiceStop}` }]);
                        }
                    }
                    if (inlineKeyboard.length > 0) {
                        await ctx.reply(message, {
                            reply_markup: {
                                inline_keyboard: inlineKeyboard
                            }
                        });
                    }
                    else {
                        await ctx.reply(message);
                    }
                    if (item.coordX && item.coordY) {
                        const coords = (0, functions_1.convertAndValidateCoords)(item.coordX, item.coordY);
                        if (coords) {
                            await ctx.sendLocation(coords.latitude, coords.longitude);
                        }
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
        ctx.reply(DATA_ERROR_MESSAGE);
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
    console.error('Errore:', typedError.message || 'Errore sconosciuto.❌');
}
exports.logError = logError;
async function fetch(apiUrl) {
    try {
        const response = await axiosService_1.default.get(apiUrl);
        return response.data;
    }
    catch (error) {
        logError(error);
        throw new Error(DATA_ERROR_MESSAGE);
    }
}
exports.fetch = fetch;
