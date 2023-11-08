"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAndValidateCoords = void 0;
function convertAndValidateCoords(coordX, coordY) {
    const latitude = parseFloat(coordX);
    const longitude = parseFloat(coordY);
    if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
    }
    return null;
}
exports.convertAndValidateCoords = convertAndValidateCoords;
