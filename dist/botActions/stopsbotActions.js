"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStopsBotActions = void 0;
function registerStopsBotActions(bot) {
    bot.action('getStopsByLocality', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = 'getStopsByLocality';
    });
    bot.action('getFirstStopByLocality', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = 'getFirstStopByLocality';
    });
}
exports.registerStopsBotActions = registerStopsBotActions;
