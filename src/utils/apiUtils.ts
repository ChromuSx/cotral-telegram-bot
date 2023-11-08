import { Context } from "telegraf";
import api from "../services/axiosService";
import { convertAndValidateCoords } from "./functions";

const NO_DATA_MESSAGE = 'Nessun dato disponibile.';
export async function handleApiResponse<T>(
    ctx: Context, 
    apiUrl: string | null, 
    formatter: (data: T) => string, 
    isStringArray: boolean = false
): Promise<void> {
    if (!apiUrl) {
        ctx.reply('Per favore, fornisci parametri validi.');
        return;
    }

    try {
        const data = await fetch<T>(apiUrl);
        if (Array.isArray(data)) {
            if (data.length === 0) {
                await ctx.reply(NO_DATA_MESSAGE);
                return;
            }
            if (isStringArray) {
                const message = formatter(data as unknown as T);
                await ctx.reply(message);
            } else {
                for (const item of data) {
                    const message = formatter(item);

                    const inlineKeyboard = [];
                    if (item.codicePalina) {
                        inlineKeyboard.push([{ text: "Transiti", callback_data: `transits:getTransits:${item.codicePalina}` }]);
                        if (item.preferita) {
                            inlineKeyboard.push([{ text: "Rimuovi dai preferiti", callback_data: `poles:remove_favorite:${item.codicePalina}` }]);
                        } else {
                            inlineKeyboard.push([{ text: "Aggiungi ai preferiti", callback_data: `poles:add_favorite:${item.codicePalina}:${item.codiceStop}` }]);
                        }
                    } 
                    
                    if (inlineKeyboard.length > 0) {
                        await ctx.reply(message, {
                            reply_markup: {
                                inline_keyboard: inlineKeyboard
                            }
                        });
                    } else {
                        await ctx.reply(message);
                    }
                    
                    if (item.coordX && item.coordY) {
                        const coords = convertAndValidateCoords(item.coordX, item.coordY);
                        if (coords) {
                            await ctx.sendLocation(coords.latitude, coords.longitude);
                        }
                    }
                }
            }
        } else {
            const message = formatFetchedData(data, formatter);
            await ctx.reply(message);

            if (data && data.coordX && data.coordY) {
                await ctx.sendLocation(data.coordX, data.coordY);
            }
        }
    } catch (error) {
        logError(error);
        ctx.reply('Si è verificato un errore durante il recupero dei dati');
    }
}

export function formatFetchedData<T>(data: void, formatData: (data: T) => string): string {
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

export function logError(error: unknown): void {
    const typedError = error as { message?: string };
    console.error('Errore:', typedError.message || 'Errore sconosciuto');
}

export async function fetch<T>(apiUrl: string): Promise<any> {
    try {
        const response = await api.get<void>(apiUrl);
        return response.data;
    } catch (error) {
        logError(error);
        throw new Error('Si è verificato un errore durante il recupero dei dati');
    }
}