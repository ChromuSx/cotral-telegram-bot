import { Context } from 'telegraf';
import { MyContext } from '../interfaces/MyContext';
import { handleApiResponse } from '../utils/apiUtils';
import { Stop } from '../interfaces/Stop';

export async function getStopsByLocality(ctx: Context, locality: string): Promise<void> {
    const apiUrl = `/stops/${locality}`;
    await handleApiResponse(ctx, apiUrl, formatStopMessage);
}

export async function getFirstStopByLocality(ctx: MyContext, locality: string): Promise<void> {
    const apiUrl = `/stops/firststop/${locality}`;
    await handleApiResponse(ctx, apiUrl, formatStopMessage);
}

function formatStopMessage(stop: Stop): string {
    return [
        `Fermata:`,
        `Codice Fermata: ${stop.codiceStop ?? 'Non disponibile'}`,
        `Nome Fermata: ${stop.nomeStop ?? 'Non disponibile'}`,
        `Località: ${stop.localita ?? 'Non disponibile'}`,
        `Coord X: ${stop.coordX ?? 'Non disponibile'}`,
        `Coord Y: ${stop.coordY ?? 'Non disponibile'}`,
    ].join('\n');
}
