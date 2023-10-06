import { Context } from 'telegraf';
import { Transit } from '../interfaces/Transit'; 
import { handleApiResponse } from '../utils/apiUtils'; 

export async function getTransitsByPoleCode(ctx: Context, poleCode: string): Promise<void> {
    const apiUrl = `/transits/${poleCode}`;
    await handleApiResponse(ctx, apiUrl, (response: any) => {
        const transits = response.transits;
        return transits.map(formatTransitMessage).join('\n\n');
    });
}


function formatTransitMessage(transit: Transit): string {
    return [
        `ID Corsa: ${transit.idCorsa ?? 'Non disponibile'}`,
        `Percorso: ${transit.percorso ?? 'Non disponibile'}`,
        `Partenza: ${transit.partenzaCorsa ?? 'Non disponibile'} - Orario: ${transit.orarioPartenzaCorsa ?? 'Non disponibile'}`,
        `Arrivo: ${transit.arrivoCorsa ?? 'Non disponibile'} - Orario: ${transit.orarioArrivoCorsa ?? 'Non disponibile'}`,
        `Soppressa: ${transit.soppressa ?? 'Non disponibile'}`,
        `Numero Ordine: ${transit.numeroOrdine ?? 'Non disponibile'}`,
        `Tempo Transito: ${transit.tempoTransito ?? 'Non disponibile'}`,
        `Ritardo: ${transit.ritardo ?? 'Non disponibile'}`,
        `Passato: ${transit.passato ?? 'Non disponibile'}`,
        `Automezzo: Codice - ${transit.automezzo?.codice ?? 'Non disponibile'}, IsAlive - ${transit.automezzo?.isAlive ?? 'Non disponibile'}`,
        `Testo Fermata: ${transit.testoFermata ?? 'Non disponibile'}`,
        `Data Modifica: ${transit.dataModifica ?? 'Non disponibile'}`,
        `Instradamento: ${transit.instradamento ?? 'Non disponibile'}`,
        `Banchina: ${transit.banchina ?? 'Non disponibile'}`,
        `Monitorata: ${transit.monitorata ?? 'Non disponibile'}`,
        `Accessibile: ${transit.accessibile ?? 'Non disponibile'}`
    ].join('\n');
}
