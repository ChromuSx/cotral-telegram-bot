"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStopsBotActions = void 0;
const telegraf_1 = require("telegraf");
const stopsCommands_1 = require("../commands/stopsCommands");
function registerStopsBotActions(bot) {
    const stopsMenu = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Fermate per località', stopsCommands_1.StopsCommands.GetStopsByLocality),
        telegraf_1.Markup.button.callback('Prima fermata per località', stopsCommands_1.StopsCommands.GetFirstStopByLocality)
    ]);
    bot.action('STOPS_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', stopsMenu);
    });
    bot.action(stopsCommands_1.StopsCommands.GetStopsByLocality, async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = stopsCommands_1.StopsCommands.GetStopsByLocality;
    });
    bot.action(stopsCommands_1.StopsCommands.GetFirstStopByLocality, async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = stopsCommands_1.StopsCommands.GetFirstStopByLocality;
    });
}
exports.registerStopsBotActions = registerStopsBotActions;
