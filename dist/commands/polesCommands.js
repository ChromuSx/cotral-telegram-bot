"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPolesDestinationsByArrivalLocality = exports.getPoleByArrivalAndDestinationLocality = exports.getPolesByPosition = exports.getPolesByCode = void 0;
const apiUtils_1 = require("../utils/apiUtils");
async function getPolesByCode(ctx, code) {
    const apiUrl = `/poles/${code}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatPoleMessage);
}
exports.getPolesByCode = getPolesByCode;
async function getPolesByPosition(ctx, params) {
    const { latitude, longitude, range } = params;
    const apiUrl = `/poles/position?latitude=${latitude}&longitude=${longitude}${range ? `&range=${range}` : ''}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatPoleMessage);
}
exports.getPolesByPosition = getPolesByPosition;
async function getPoleByArrivalAndDestinationLocality(ctx, params) {
    const { arrival, destination } = params;
    const apiUrl = `/poles/${arrival}/${destination}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatPoleMessage);
}
exports.getPoleByArrivalAndDestinationLocality = getPoleByArrivalAndDestinationLocality;
async function getAllPolesDestinationsByArrivalLocality(ctx, arrivalLocality) {
    const apiUrl = `/poles/destinations/${arrivalLocality}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatStringArray, true);
}
exports.getAllPolesDestinationsByArrivalLocality = getAllPolesDestinationsByArrivalLocality;
function formatPoleMessage(pole) {
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
function formatStringArray(data) {
    return data.join(', ');
}
