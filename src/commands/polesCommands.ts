import { Context } from 'telegraf';
import { Pole } from '../interfaces/Pole';
import { MyContext } from '../interfaces/MyContext';
import { handleApiResponse } from '../utils/apiUtils';

export async function getPolesByCode(ctx: Context, code: string): Promise<void> {
    const apiUrl = `/poles/${code}`;
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
    await handleApiResponse(ctx, apiUrl, formatStringArray);
}

function formatPoleMessage(pole: Pole): string {
    return [
        `Palina:`,
        `Codice Palina: ${pole.codicePalina ?? 'Non disponibile'}`,
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