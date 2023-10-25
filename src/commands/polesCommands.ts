import { Context } from 'telegraf';
import { Pole } from '../interfaces/Pole';
import { MyContext } from '../interfaces/MyContext';
import { handleApiResponse, logError } from '../utils/apiUtils';
import api from '../services/axiosService';

export async function getPolesByCode(ctx: Context, code: string, params: { userId?: number | undefined }): Promise<void> {
    const { userId } = params;
    const apiUrl = `/poles/${code}?userId=${userId}`;
    await handleApiResponse(ctx, apiUrl, formatPoleMessage);
}

export async function getPolesByPosition(ctx: MyContext, params: { latitude: number, longitude: number, range?: number }) {
    const { latitude, longitude, range } = params;
    const apiUrl = `/poles/position?latitude=${latitude}&longitude=${longitude}${range ? `&range=${range}` : ''}`;
    await handleApiResponse(ctx, apiUrl, formatPoleMessage);
}

export async function getPoleByArrivalAndDestinationLocality(ctx: Context, params: { arrival: string, destination: string }): Promise<void> {
    const { arrival, destination } = params;
    const apiUrl = `/poles/${arrival}/${destination}`;
    await handleApiResponse(ctx, apiUrl, formatPoleMessage);
}

export async function getAllPolesDestinationsByArrivalLocality(ctx: Context, arrivalLocality: string): Promise<void> {
    const apiUrl = `/poles/destinations/${arrivalLocality}`;
    await handleApiResponse(ctx, apiUrl, formatStringArray, true);
}

export async function getFavoritePoles(ctx: Context, userId: number): Promise<void> {
    const apiUrl = `/poles/favorites/${userId}`;
    await handleApiResponse(ctx, apiUrl, formatPoleMessage);
}

export async function addFavoritePole(ctx: Context, poleCode: string, stopCode: string, userId: number): Promise<void> {
    const apiUrl = '/poles/favorites';
    const requestBody = { userId, poleCode, stopCode };

    try {
        await api.post(apiUrl, requestBody);
        await ctx.reply('Palo aggiunto ai preferiti con successo!');
    } catch (error) {
        logError(error);
        await ctx.reply('Si è verificato un errore durante l\'aggiunta del palo ai preferiti.');
    }
}

export async function removeFavoritePole(ctx: Context, poleCode: string, userId: number): Promise<void> {
    const apiUrl = '/poles/favorites';
    const requestBody = { userId, poleCode };

    try {
        await api.delete(apiUrl, { data: requestBody });
        await ctx.reply('Palo rimosso dai preferiti con successo!');
    } catch (error) {
        logError(error);
        await ctx.reply('Si è verificato un errore durante la rimozione del palo dai preferiti.');
    }
}

function formatPoleMessage(pole: Pole): string {
    return [
        `Palina:`,
        `Codice Palina: ${pole.codicePalina ?? 'Non disponibile'}`,
        `Codice Stop: ${pole.codiceStop ?? 'Non disponibile'}`,
        `Nome Palina: ${pole.nomePalina ?? 'Non disponibile'}`,
        `Nome Stop: ${pole.nomeStop ?? 'Non disponibile'}`,
        `Località: ${pole.localita ?? 'Non disponibile'}`,
        `Comune: ${pole.comune ?? 'Non disponibile'}`,
        `Coord X: ${pole.coordX ?? 'Non disponibile'}`,
        `Coord Y: ${pole.coordY ?? 'Non disponibile'}`,
        `Zona tariffaria: ${pole.zonaTariffaria ? 'Sì' : 'No'}`,
        `Distanza: ${pole.distanza ?? 'Non disponibile'}`,
        `Destinazioni: ${pole.destinazioni ? pole.destinazioni.join(', ') : 'Non disponibile'}`,
        `Cotral: ${pole.isCotral ? 'Sì' : 'No'}`,
        `Capolinea: ${pole.isCapolinea ? 'Sì' : 'No'}`,
        `Banchinato: ${pole.isBanchinato ? 'Sì' : 'No'}`
    ].join('\n');
}

function formatStringArray(data: string[]): string {
    return data.join(', ');
}