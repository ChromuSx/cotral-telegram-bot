"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBoolean = exports.convertAndValidateCoords = void 0;
function convertAndValidateCoords(coordX, coordY) {
    const latitude = parseFloat(coordX);
    const longitude = parseFloat(coordY);
    if (!isNaN(latitude) && !isNaN(longitude)) {
        return { latitude, longitude };
    }
    return null;
}
exports.convertAndValidateCoords = convertAndValidateCoords;
function formatBoolean(value) {
    if (value === true) {
        return 'Sì';
    }
    else if (value === false) {
        return 'No';
    }
    else {
        return 'Non disponibile';
    }
}
exports.formatBoolean = formatBoolean;
