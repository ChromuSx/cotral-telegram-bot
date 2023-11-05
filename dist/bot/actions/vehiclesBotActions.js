"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVehiclesBotActions = void 0;
const telegraf_1 = require("telegraf");
const vehiclesCommands_1 = require("../../commands/vehiclesCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
function registerVehiclesBotActions(bot) {
    const vehiclesMenu = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Posizione veicolo per codice veicolo', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions)
    ]);
    bot.action('VEHICLES_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', vehiclesMenu);
    });
    bot.action(vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice veicolo:', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions);
    });
}
exports.registerVehiclesBotActions = registerVehiclesBotActions;
