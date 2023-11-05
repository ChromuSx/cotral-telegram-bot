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
exports.commandActions = void 0;
const telegraf_1 = require("telegraf");
const polesCommands_1 = require("../../commands/polesCommands");
const polesApiHandler = __importStar(require("../../apiHandlers/polesApiHandler"));
const telegrafUtils_1 = require("../../utils/telegrafUtils");
const stopsCommands_1 = require("../../commands/stopsCommands");
const transitsCommands_1 = require("../../commands/transitsCommands");
const vehiclesCommands_1 = require("../../commands/vehiclesCommands");
exports.commandActions = {
    [`/${polesCommands_1.PolesCommands.GetPolesByCode}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice:', polesCommands_1.PolesCommands.GetPolesByCode),
    [`/${polesCommands_1.PolesCommands.GetPolesByPosition}`]: async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetPolesByPosition;
        const keyboard = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            telegraf_1.Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`/${polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination}`]: async (ctx) => {
        ctx.session.step = 'arrival';
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci l\'arrivo:', polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`/${polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località di arrivo:', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${stopsCommands_1.StopsCommands.GetStopsByLocality}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetStopsByLocality),
    [`/${stopsCommands_1.StopsCommands.GetFirstStopByLocality}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetFirstStopByLocality),
    [`/${transitsCommands_1.TransitsCommands.GetTransitsByPoleCode}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice della palina:', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode),
    [`/${vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice del veicolo:', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions),
    [`/${polesCommands_1.PolesCommands.GetFavoritePoles}`]: async (ctx, userId) => {
        if (userId) {
            await polesApiHandler.getFavoritePoles(ctx, userId);
        }
        else {
            await ctx.reply('UserID non trovato');
        }
    }
};
