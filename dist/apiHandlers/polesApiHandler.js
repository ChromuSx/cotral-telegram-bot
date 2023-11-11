"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoritePole = exports.addFavoritePole = exports.getFavoritePoles = exports.getAllPolesDestinationsByArrivalLocality = exports.getPoleByArrivalAndDestinationLocality = exports.getPolesByPosition = exports.getPolesByCode = void 0;
const apiUtils_1 = require("../utils/apiUtils");
const axiosService_1 = __importDefault(require("../services/axiosService"));
async function getPolesByCode(ctx, code, params) {
    const { userId } = params;
    const apiUrl = `/poles/${code}?userId=${userId}`;
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
async function getFavoritePoles(ctx, userId) {
    const apiUrl = `/poles/favorites/${userId}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatPoleMessage);
}
exports.getFavoritePoles = getFavoritePoles;
async function addFavoritePole(ctx, poleCode, stopCode, userId) {
    const apiUrl = '/poles/favorites';
    const requestBody = { userId, poleCode, stopCode };
    try {
        await axiosService_1.default.post(apiUrl, requestBody);
        await ctx.reply('Palo aggiunto ai preferiti con successo!✅');
    }
    catch (error) {
        (0, apiUtils_1.logError)(error);
        await ctx.reply('Si è verificato un errore durante l\'aggiunta del palo ai preferiti.❌');
    }
}
exports.addFavoritePole = addFavoritePole;
async function removeFavoritePole(ctx, poleCode, userId) {
    const apiUrl = '/poles/favorites';
    const requestBody = { userId, poleCode };
    try {
        await axiosService_1.default.delete(apiUrl, { data: requestBody });
        await ctx.reply('Palo rimosso dai preferiti con successo!✅');
    }
    catch (error) {
        (0, apiUtils_1.logError)(error);
        await ctx.reply('Si è verificato un errore durante la rimozione del palo dai preferiti.❌');
    }
}
exports.removeFavoritePole = removeFavoritePole;
function formatPoleMessage(pole) {
    return [
        `Codice Palina: ${pole.codicePalina ?? 'Non disponibile'}`,
        `Codice Stop: ${pole.codiceStop ?? 'Non disponibile'}`,
        `Nome Palina: ${pole.nomePalina ?? 'Non disponibile'}`,
        `Nome Stop: ${pole.nomeStop ?? 'Non disponibile'}`,
        `Località: ${pole.localita ?? 'Non disponibile'}`,
        `Comune: ${pole.comune ?? 'Non disponibile'}`,
        //`Coord X: ${pole.coordX ?? 'Non disponibile'}`,
        //`Coord Y: ${pole.coordY ?? 'Non disponibile'}`,
        //`Zona tariffaria: ${pole.zonaTariffaria ? 'Sì' : 'No'}`,
        //`Distanza: ${pole.distanza ?? 'Non disponibile'}`,
        `Destinazioni: ${pole.destinazioni ? pole.destinazioni.join(', ') : 'Non disponibile'}`,
        //`Cotral: ${pole.isCotral ? 'Sì' : 'No'}`,
        //`Capolinea: ${pole.isCapolinea ? 'Sì' : 'No'}`,
        //`Banchinato: ${pole.isBanchinato ? 'Sì' : 'No'}`
    ].join('\n');
}
function formatStringArray(data) {
    return data.join(', ');
}
