"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTransitsBotActions = void 0;
function registerTransitsBotActions(bot) {
    bot.action('getTransitsByPoleCode', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci codice palina:');
        myCtx.session.command = 'getTransitsByPoleCode';
    });
}
exports.registerTransitsBotActions = registerTransitsBotActions;
