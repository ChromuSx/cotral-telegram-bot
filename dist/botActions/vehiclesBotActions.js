"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVehiclesBotActions = void 0;
function registerVehiclesBotActions(bot) {
    bot.action('getVehicleRealTimePositions', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci codice veicolo:');
        myCtx.session.command = 'getVehicleRealTimePositions';
    });
}
exports.registerVehiclesBotActions = registerVehiclesBotActions;
