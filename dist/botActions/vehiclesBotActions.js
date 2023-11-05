"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVehiclesBotActions = void 0;
const telegraf_1 = require("telegraf");
const vehiclesCommands_1 = require("../commands/vehiclesCommands");
function registerVehiclesBotActions(bot) {
    const vehiclesMenu = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Posizione veicolo per codice veicolo', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions)
    ]);
    bot.action('VEHICLES_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', vehiclesMenu);
    });
    bot.action(vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions, async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci codice veicolo:');
        myCtx.session.command = vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions;
    });
}
exports.registerVehiclesBotActions = registerVehiclesBotActions;
