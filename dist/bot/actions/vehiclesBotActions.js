"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVehiclesBotActions = void 0;
const telegraf_1 = require("telegraf");
const vehiclesCommands_1 = require("../../commands/vehiclesCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
const vehiclesMenu = telegraf_1.Markup.keyboard([
    [
        telegraf_1.Markup.button.callback('Posizione veicolo per codice veicolo🔢', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions)
    ],
    [
        telegraf_1.Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);
function registerVehiclesBotActions(bot) {
    bot.action(vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice veicolo:', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions);
    });
}
exports.registerVehiclesBotActions = registerVehiclesBotActions;
