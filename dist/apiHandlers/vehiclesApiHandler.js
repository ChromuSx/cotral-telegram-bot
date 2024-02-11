"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleRealTimePositions = void 0;
const apiUtils_1 = require("../utils/apiUtils");
async function getVehicleRealTimePositions(ctx, vehicleCode) {
    const apiUrl = `/vehiclerealtimepositions/${vehicleCode}`;
    await (0, apiUtils_1.handleApiResponse)(ctx, apiUrl, formatVehicleRealTimePositions);
}
exports.getVehicleRealTimePositions = getVehicleRealTimePositions;
function formatVehicleRealTimePositions(vehicleData) {
    return [
        //`Coordinate X: ${vehicleData.coordX ?? 'Non disponibile'}`,
        //`Coordinate Y: ${vehicleData.coordY ?? 'Non disponibile'}`,
        `Ora: ${vehicleData.time ?? 'Non disponibile'}`
    ].join('\n');
}
