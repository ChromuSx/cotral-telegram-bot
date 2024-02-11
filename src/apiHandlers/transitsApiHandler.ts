import { Context } from 'telegraf';
import { Transit } from '../interfaces/Transit'; 
import { handleApiResponse } from '../utils/apiUtils';
import { format, isValid, parseISO } from 'date-fns';
import { formatBoolean } from '../utils/functions';

export async function getTransitsByPoleCode(ctx: Context, poleCode: string): Promise<void> {
    const apiUrl = `/transits/${poleCode}`;
    await handleApiResponse(ctx, apiUrl, (response: any) => {
        const transits = response.transits;
        return transits.map((transit: Transit) =>
        {
            const inlineKeyboard: any = [];
            if (transit.automezzo?.codice) {
                inlineKeyboard.push([{ text: "Veicolo🚎", callback_data: `vehicles:getVehicleRealTimePositions:${transit.automezzo.codice}` }]);
            }
            ctx.reply(formatTransitMessage(transit), {
                reply_markup: {
                    inline_keyboard: inlineKeyboard
                }
            });
        }
        );
    });
}

function formatTransitMessage(transit: Transit): string {
    const formatDateTime = (dateString: string | null): string => {
        if (!dateString) return 'Non disponibile';
        const date = parseISO(dateString);
        return isValid(date) ? format(date, 'dd/MM/yyyy HH:mm:ss') : 'Data non valida';
    };
    return [
        //`ID Corsa: ${transit.idCorsa ?? 'Non disponibile'}`,
        //`Percorso: ${transit.percorso ?? 'Non disponibile'}`,
        `Partenza: ${transit.partenzaCorsa ?? 'Non disponibile'}`,
        `Orario partenza: ${formatDateTime(transit.orarioPartenzaCorsa)}`,
        `Arrivo: ${transit.arrivoCorsa ?? 'Non disponibile'}`,
        `Orario arrivo: ${formatDateTime(transit.orarioArrivoCorsa)}`,
        //`Soppressa: ${transit.soppressa ?? 'Non disponibile'}`,
        //`Numero Ordine: ${transit.numeroOrdine ?? 'Non disponibile'}`,
        `Tempo Transito: ${formatDateTime(transit.tempoTransito)}`,
        `Ritardo: ${transit.ritardo ? 'Sì' : 'No'}`,
        //`Passato: ${transit.passato ? 'Sì' : 'No'}`,
        `Automezzo: Codice - ${transit.automezzo?.codice ?? 'Non disponibile'}, Attivo - ${formatBoolean(transit.automezzo?.isAlive)}`,
        //`Testo Fermata: ${transit.testoFermata ?? 'Non disponibile'}`,
        //`Data Modifica: ${formatDateTime(transit.dataModifica)}`,
        `Instradamento: ${transit.instradamento ?? 'Non disponibile'}`,
        //`Banchina: ${transit.banchina ? 'Sì' : 'No'}`,
        //`Monitorata: ${transit.monitorata ? 'Sì' : 'No'}`,
        //`Accessibile: ${transit.accessibile ? 'Sì' : 'No'}`
    ].join('\n');
}
