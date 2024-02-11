"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandActions = void 0;
const telegraf_1 = require("telegraf");
const polesCommands_1 = require("../../commands/polesCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
const stopsCommands_1 = require("../../commands/stopsCommands");
const transitsCommands_1 = require("../../commands/transitsCommands");
const vehiclesCommands_1 = require("../../commands/vehiclesCommands");
const polesBotActions_1 = require("../actions/polesBotActions");
const sharedCommands_1 = require("../../commands/sharedCommands");
const bot_1 = require("../bot");
const sharedActions = {
    [`${sharedCommands_1.SharedCommands.BackToMainMenu}`]: async (ctx) => { (0, bot_1.mainMenu)(ctx); },
};
const polesActions = {
    [`${polesCommands_1.PolesCommands.GetPolesMenu}`]: async (ctx) => { await ctx.reply('Seleziona un\'opzione:', polesBotActions_1.polesMenu); },
    [`${polesCommands_1.PolesCommands.GetPolesByCodeFromMenu}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice:', polesCommands_1.PolesCommands.GetPolesByCode),
    [`/${polesCommands_1.PolesCommands.GetPolesByCode}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice:', polesCommands_1.PolesCommands.GetPolesByCode),
    [`${polesCommands_1.PolesCommands.GetPolesByPositionFromMenu}`]: async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetPolesByPosition;
        const keyboard = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            telegraf_1.Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`/${polesCommands_1.PolesCommands.GetPolesByPosition}`]: async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetPolesByPosition;
        const keyboard = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            telegraf_1.Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`${polesCommands_1.PolesCommands.GetPoleByArrivalAndDestinationFromMenu}`]: async (ctx) => {
        ctx.session.step = 'arrival';
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci l\'arrivo:', polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`/${polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination}`]: async (ctx) => {
        ctx.session.step = 'arrival';
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci l\'arrivo:', polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`${polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrivalFromMenu}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località di arrivo:', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrivalFromMenu}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località di arrivo:', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località di arrivo:', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival),
    [`${polesCommands_1.PolesCommands.GetFavoritePolesFromMenu}`]: async (ctx, userId) => await (0, polesCommands_1.handleGetFavoritePoles)(ctx, userId),
    [`/${polesCommands_1.PolesCommands.GetFavoritePoles}`]: async (ctx, userId) => await (0, polesCommands_1.handleGetFavoritePoles)(ctx, userId)
};
const stopsActions = {
    [`${stopsCommands_1.StopsCommands.GetStopsByLocality}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetStopsByLocality),
    [`${stopsCommands_1.StopsCommands.GetFirstStopByLocality}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetFirstStopByLocality)
};
const transitsActions = {
    [`/${transitsCommands_1.TransitsCommands.GetTransitsByPoleCode}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice della palina:', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode)
};
const vehiclesActions = {
    [`/${vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice del veicolo:', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions)
};
exports.commandActions = {
    ...sharedActions,
    ...polesActions,
    ...stopsActions,
    ...transitsActions,
    ...vehiclesActions
};
