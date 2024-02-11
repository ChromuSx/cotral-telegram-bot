"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetFavoritePoles = exports.PolesCommands = void 0;
const polesApiHandler = __importStar(require("../apiHandlers/polesApiHandler"));
var PolesCommands;
(function (PolesCommands) {
    PolesCommands["GetPolesMenu"] = "Paline\uD83E\uDEA7";
    PolesCommands["GetFavoritePolesFromMenu"] = "Preferiti\u2728";
    PolesCommands["GetFavoritePoles"] = "getfavoritepoles";
    PolesCommands["GetPolesByCodeFromMenu"] = "Codice\uD83D\uDD22";
    PolesCommands["GetPolesByCode"] = "getpolesbycode";
    PolesCommands["GetPolesByPositionFromMenu"] = "Posizione\uD83D\uDCCD";
    PolesCommands["GetPolesByPosition"] = "getpolesbyposition";
    PolesCommands["GetPoleByArrivalAndDestinationFromMenu"] = "Arrivo e destinazione\uD83D\uDEB6\uD83C\uDFC1";
    PolesCommands["GetPoleByArrivalAndDestination"] = "getpolebyarrivalanddestination";
    PolesCommands["GetAllPolesDestinationsByArrivalFromMenu"] = "Localit\u00E0 di arrivo\uD83D\uDEB6";
    PolesCommands["GetAllPolesDestinationsByArrival"] = "getallpolesdestinationsbyarrival";
})(PolesCommands || (exports.PolesCommands = PolesCommands = {}));
async function handleGetFavoritePoles(ctx, userId) {
    if (userId) {
        await polesApiHandler.getFavoritePoles(ctx, userId);
    }
    else {
        await ctx.reply('UserID non trovato');
    }
}
exports.handleGetFavoritePoles = handleGetFavoritePoles;
