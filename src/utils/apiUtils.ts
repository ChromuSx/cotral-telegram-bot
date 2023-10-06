import { Context } from "telegraf";
import api from "../services/axiosService";

const NO_DATA_MESSAGE = 'Nessun dato disponibile.';

export async function handleApiResponse<T>(ctx: Context, apiUrl: string | null, formatter: (data: T) => string): Promise<void> {
    if (!apiUrl) {
        ctx.reply('Per favore, fornisci parametri validi.');
        return;
    }

    try {
        const data = await fetch<T>(apiUrl);
        const message = formatFetchedData(data, formatter);
        ctx.reply(message);
    } catch (error) {
        logError(error);
        ctx.reply('Si è verificato un errore durante il recupero dei dati');
    }
}

export function formatFetchedData<T>(data: void, formatData: (data: T) => string): string {
    if (Array.isArray(data)) {
        if (data.length > 0) {
            if (typeof data[0] === 'string') {
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

export async function fetch<T>(apiUrl: string): Promise<void> {
    try {
      const response = await api.get<void>(apiUrl);
      return response.data;
    } catch (error) {
      logError(error);
      throw new Error('Si è verificato un errore durante il recupero dei dati');
    }
  }