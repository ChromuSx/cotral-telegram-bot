"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStopsBotActions = void 0;
const telegraf_1 = require("telegraf");
const stopsCommands_1 = require("../../commands/stopsCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
function registerStopsBotActions(bot) {
    const stopsMenu = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Fermate per località', stopsCommands_1.StopsCommands.GetStopsByLocality),
        telegraf_1.Markup.button.callback('Prima fermata per località', stopsCommands_1.StopsCommands.GetFirstStopByLocality)
    ]);
    bot.action('STOPS_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', stopsMenu);
    });
    bot.action(stopsCommands_1.StopsCommands.GetStopsByLocality, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetStopsByLocality);
    });
    bot.action(stopsCommands_1.StopsCommands.GetFirstStopByLocality, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetFirstStopByLocality);
    });
}
exports.registerStopsBotActions = registerStopsBotActions;
