"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstStopByLocality = exports.getStopsByLocality = void 0;
const apiUtils_1 = require("../utils/apiUtils");
async function getStopsByLocality(ctx, locality) {
    const apiUrl = `/stops/${locality}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatStopMessage);
}
exports.getStopsByLocality = getStopsByLocality;
async function getFirstStopByLocality(ctx, locality) {
    const apiUrl = `/stops/firststop/${locality}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatStopMessage);
}
exports.getFirstStopByLocality = getFirstStopByLocality;
function formatStopMessage(stop) {
    return [
        `Fermata:`,
        `Codice Fermata: ${stop.codiceStop ?? 'Non disponibile'}`,
        `Nome Fermata: ${stop.nomeStop ?? 'Non disponibile'}`,
        `Località: ${stop.localita ?? 'Non disponibile'}`,
        `Coord X: ${stop.coordX ?? 'Non disponibile'}`,
        `Coord Y: ${stop.coordY ?? 'Non disponibile'}`,
    ].join('\n');
}
