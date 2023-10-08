"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransitsByPoleCode = void 0;
const apiUtils_1 = require("../utils/apiUtils");
const date_fns_1 = require("date-fns");
async function getTransitsByPoleCode(ctx, poleCode) {
    const apiUrl = `/transits/${poleCode}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, (response) => {
        const transits = response.transits;
        return transits.map(formatTransitMessage).join('\n\n');
    });
}
exports.getTransitsByPoleCode = getTransitsByPoleCode;
function formatTransitMessage(transit) {
    const formatDateTime = (dateString) => {
        if (!dateString)
            return 'Non disponibile';
        const date = (0, date_fns_1.parseISO)(dateString);
        return (0, date_fns_1.isValid)(date) ? (0, date_fns_1.format)(date, 'dd/MM/yyyy HH:mm:ss') : 'Data non valida';
    };
    return [
        `ID Corsa: ${transit.idCorsa ?? 'Non disponibile'}`,
        `Percorso: ${transit.percorso ?? 'Non disponibile'}`,
        `Partenza: ${transit.partenzaCorsa ?? 'Non disponibile'} - Orario: ${formatDateTime(transit.orarioPartenzaCorsa)}`,
        `Arrivo: ${transit.arrivoCorsa ?? 'Non disponibile'} - Orario: ${formatDateTime(transit.orarioArrivoCorsa)}`,
        `Soppressa: ${transit.soppressa ?? 'Non disponibile'}`,
        `Numero Ordine: ${transit.numeroOrdine ?? 'Non disponibile'}`,
        `Tempo Transito: ${transit.tempoTransito ?? 'Non disponibile'}`,
        `Ritardo: ${transit.ritardo ? 'Sì' : 'No'}`,
        `Passato: ${transit.passato ? 'Sì' : 'No'}`,
        `Automezzo: Codice - ${transit.automezzo?.codice ?? 'Non disponibile'}, IsAlive - ${transit.automezzo?.isAlive ?? 'Non disponibile'}`,
        `Testo Fermata: ${transit.testoFermata ?? 'Non disponibile'}`,
        `Data Modifica: ${formatDateTime(transit.dataModifica)}`,
        `Instradamento: ${transit.instradamento ?? 'Non disponibile'}`,
        `Banchina: ${transit.banchina ? 'Sì' : 'No'}`,
        `Monitorata: ${transit.monitorata ? 'Sì' : 'No'}`,
        `Accessibile: ${transit.accessibile ? 'Sì' : 'No'}`
    ].join('\n');
}
